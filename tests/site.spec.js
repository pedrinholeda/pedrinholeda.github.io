const { test, expect } = require("@playwright/test");

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
  await botao.click();
  await expect(botao).toHaveAttribute("aria-expanded", "true");
  await page.locator(".nav-menu a[data-section=apps]").click();
  await expect(botao).toHaveAttribute("aria-expanded", "false");
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
