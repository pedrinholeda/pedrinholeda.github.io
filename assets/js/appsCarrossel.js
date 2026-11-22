// Carrossel da seção Apps: setas, pontos e esmaecimento nas bordas.
// A rolagem em si é nativa (toque, trackpad, teclado); o script só a controla.
(function () {
  const carrossel = document.querySelector(".apps-carrossel");
  if (!carrossel) return;

  const trilho = carrossel.querySelector(".conteudo-apps");
  const cards = Array.from(trilho.querySelectorAll(".app-card"));
  const pontosEl = carrossel.querySelector(".apps-pontos");
  const [anterior, proximo] = carrossel.querySelectorAll(".apps-seta");
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  const comportamento = () => (reduzMovimento.matches ? "auto" : "smooth");

  // Distância de um card mais o espaço entre eles.
  function passo() {
    if (cards.length < 2) return trilho.clientWidth;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }

  function irPara(indice) {
    trilho.scrollTo({ left: indice * passo(), behavior: comportamento() });
  }

  const pontos = cards.map((_, i) => {
    const ponto = document.createElement("button");
    ponto.type = "button";
    ponto.className = "apps-ponto";
    ponto.tabIndex = -1;
    ponto.addEventListener("click", () => irPara(i));
    pontosEl.appendChild(ponto);
    return ponto;
  });

  function atualizar() {
    const max = trilho.scrollWidth - trilho.clientWidth;
    const x = trilho.scrollLeft;
    const noInicio = x <= 2;
    const noFim = x >= max - 2;

    anterior.disabled = noInicio;
    proximo.disabled = noFim;
    carrossel.classList.toggle("tem-antes", !noInicio);
    carrossel.classList.toggle("tem-depois", !noFim);
    carrossel.classList.toggle("sem-rolagem", max <= 2);

    // No fim, o último ponto fica ativo mesmo que o primeiro card visível seja outro.
    const atual = noFim ? cards.length - 1 : Math.round(x / passo());
    pontos.forEach((p, i) => p.classList.toggle("ativo", i === atual));
  }

  anterior.addEventListener("click", () => {
    trilho.scrollBy({ left: -passo(), behavior: comportamento() });
  });
  proximo.addEventListener("click", () => {
    trilho.scrollBy({ left: passo(), behavior: comportamento() });
  });

  trilho.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      trilho.scrollBy({ left: dir * passo(), behavior: comportamento() });
    }
  });

  let quadro = 0;
  trilho.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(atualizar);
    },
    { passive: true }
  );
  window.addEventListener("resize", atualizar);
  atualizar();
})();
