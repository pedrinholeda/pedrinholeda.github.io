const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

// Posição horizontal do trilho do carrossel de apps.
const posicaoTrilho = (page) =>
  page.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector(".conteudo-apps")).transform).m41);

// Todo teste falha se a página lançar erro de JavaScript.
let erros;
test.beforeEach(async ({ page }) => {
  erros = [];
  page.on("pageerror", (e) => erros.push(e.message));
  await page.goto("/");
});

test.afterEach(() => {
  expect(erros).toEqual([]);
});

test("carrega com título e seções principais", async ({ page }) => {
  await expect(page).toHaveTitle(/Pedro Léda/);
  for (const id of ["sobre", "skills", "experiencia", "apps", "contato"]) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1);
  }
});

test("troca o idioma para inglês e volta", async ({ page }) => {
  const toggle = page.locator("#lang-toggle");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("[data-i18n=apps_subtitle]")).toHaveText(/production apps I worked on/);
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
});

test("menu do celular abre e fecha", async ({ page, isMobile }) => {
  test.skip(!isMobile, "o menu sanduíche só aparece no celular");
  const botao = page.locator("#menuToggleLabel");
  const estado = page.locator("#menuToggle");
  await botao.click();
  await expect(estado).toBeChecked();
  await page.locator(".nav-menu a[data-section=apps]").click();
  await expect(estado).not.toBeChecked();
});

test("carrossel de apps anda sozinho", async ({ page }) => {
  await page.locator("#apps").scrollIntoViewIfNeeded();
  const antes = await posicaoTrilho(page);
  await page.waitForTimeout(1500);
  expect(await posicaoTrilho(page)).toBeLessThan(antes - 20);
});

test("carrossel de apps para com o mouse em cima", async ({ page, isMobile }) => {
  test.skip(isMobile, "sem mouse no celular");
  await page.locator("#apps").scrollIntoViewIfNeeded();
  const janela = page.locator(".apps-janela");
  await janela.hover();
  await page.waitForTimeout(1500);
  const parado = await posicaoTrilho(page);
  await page.waitForTimeout(500);
  expect(Math.abs((await posicaoTrilho(page)) - parado)).toBeLessThan(1);
});

test("cópias do carrossel ficam fora do teclado e do leitor de tela", async ({ page }) => {
  const copias = page.locator(".conteudo-apps > [aria-hidden=true]");
  expect(await copias.count()).toBeGreaterThan(0);
  expect(await copias.evaluateAll((els) => els.every((el) => el.inert))).toBe(true);
});

test("menu destaca a seção que ocupa a tela", async ({ page }) => {
  // Seção Apps começando a um terço da altura da tela: é ela que a pessoa está vendo.
  await page.evaluate(() => {
    const apps = document.getElementById("apps");
    const topo = apps.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: topo - window.innerHeight / 3, behavior: "instant" });
  });
  await expect(page.locator(".nav-desktop a[data-section=apps]")).toHaveClass(/active/);
  await expect(page.locator(".nav-desktop a.active")).toHaveCount(1);
});

test("menu destaca a última seção no fim da página", async ({ page }) => {
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await expect(page.locator(".nav-desktop a[data-section=contato]")).toHaveClass(/active/);
});

test("sem violações de acessibilidade (axe)", async ({ page }) => {
  // As animações de entrada (AOS) deixam o conteúdo semitransparente até rolar; mostra tudo antes.
  await page.evaluate(() => document.querySelectorAll("[data-aos]").forEach((el) => el.classList.add("aos-animate")));
  await page.waitForTimeout(1500);
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
});

// Nenhuma palavra do título dos cards de Stack pode quebrar no meio, em PT e EN.
// Quebrar no hífen ("Cross-/platform") é permitido.
for (const largura of [360, 700, 900, 1024, 1366, 1920]) {
  test(`títulos da Stack não quebram palavras em ${largura}px`, async ({ page, isMobile }) => {
    test.skip(isMobile, "as larguras são definidas no próprio teste");
    await page.setViewportSize({ width: largura, height: 900 });
    for (const idioma of ["pt", "en"]) {
      if (idioma === "en") await page.locator("#lang-toggle").click();
      const quebradas = await page.evaluate(() => {
        const ruins = [];
        document.querySelectorAll(".box-skills h3").forEach((h3) => {
          const texto = h3.firstChild;
          const re = /[^\s-]+/g;
          let m;
          while ((m = re.exec(texto.textContent))) {
            const r = document.createRange();
            r.setStart(texto, m.index);
            r.setEnd(texto, m.index + m[0].length);
            const linhas = new Set([...r.getClientRects()].map((c) => Math.round(c.top)));
            if (linhas.size > 1) ruins.push(m[0]);
          }
        });
        return ruins;
      });
      expect(quebradas, idioma).toEqual([]);
    }
  });
}
