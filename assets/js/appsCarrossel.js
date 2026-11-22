// Carrossel da seção Apps: os cards andam sem parar, em loop infinito.
// Quem visita pode arrastar (com inércia), usar as setas, a roda/trackpad ou o
// teclado; depois de um tempo sem interação, o movimento volta sozinho.
(function () {
  const carrossel = document.querySelector(".apps-carrossel");
  if (!carrossel) return;

  const janela = carrossel.querySelector(".apps-janela");
  const trilho = carrossel.querySelector(".conteudo-apps");
  const originais = Array.from(trilho.children);
  const [anterior, proximo] = carrossel.querySelectorAll(".apps-seta");

  const VELOCIDADE = 40; // px por segundo no movimento automático
  const PAUSA_APOS_INTERACAO = 2500; // ms parado depois que a pessoa mexe
  const VELOCIDADE_MAX_ARRASTO = 2500;

  // Cópias dos cards para o loop não ter emenda. Ficam fora da navegação por
  // teclado e do leitor de tela.
  function clonar() {
    originais.forEach((card) => {
      const copia = card.cloneNode(true);
      copia.setAttribute("aria-hidden", "true");
      copia.inert = true;
      trilho.appendChild(copia);
    });
  }

  let largura = 0; // largura de um conjunto de cards, com o espaço entre eles
  let passo = 0; // largura de um card mais o espaço
  function medir() {
    if (trilho.children.length === originais.length) clonar();
    largura = trilho.children[originais.length].offsetLeft - originais[0].offsetLeft;
    passo = originais.length > 1 ? originais[1].offsetLeft - originais[0].offsetLeft : largura;
    while (trilho.offsetWidth < largura + janela.clientWidth + passo) clonar();
  }
  medir();

  let pos = 0;
  let vel = 0;
  let ultimo = performance.now();
  let pausadoAte = 0;
  let mouseDentro = false;
  let focoDentro = false;
  let visivel = true;
  let tween = null;
  let arrasto = null;
  let suprimirClique = false;

  const agora = () => performance.now();
  const embrulhar = (x) => ((x % largura) + largura) % largura;
  const segurar = () => {
    pausadoAte = agora() + PAUSA_APOS_INTERACAO;
  };

  function quadro(t) {
    const dt = Math.min((t - ultimo) / 1000, 0.05);
    ultimo = t;

    if (visivel && largura > 0) {
      if (arrasto && arrasto.ativo) {
        // A posição vem do ponteiro.
      } else if (tween) {
        const p = Math.min((t - tween.inicio) / tween.duracao, 1);
        const suave = 1 - Math.pow(1 - p, 3);
        pos = tween.de + (tween.para - tween.de) * suave;
        if (p >= 1) {
          tween = null;
          vel = 0;
        }
      } else {
        // Acelera e freia de forma suave; ao soltar um arrasto, a velocidade
        // dele vai se dissipando até parar.
        const parado = mouseDentro || focoDentro || t < pausadoAte;
        const alvo = parado ? 0 : VELOCIDADE;
        vel += (alvo - vel) * Math.min(1, dt * (parado ? 4 : 1.5));
        pos = embrulhar(pos + vel * dt);
      }
      trilho.style.transform = `translate3d(${-embrulhar(pos)}px, 0, 0)`;
    }
    requestAnimationFrame(quadro);
  }
  requestAnimationFrame(quadro);

  // Setas e teclado: anda um card, alinhado.
  function mover(direcao) {
    const base = tween ? tween.para : pos;
    const para = (Math.round(base / passo) + direcao) * passo;
    tween = { de: pos, para, inicio: agora(), duracao: 600 };
    segurar();
  }
  anterior.addEventListener("click", () => mover(-1));
  proximo.addEventListener("click", () => mover(1));
  janela.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      mover(e.key === "ArrowRight" ? 1 : -1);
    }
  });

  // Arrastar com mouse ou dedo.
  janela.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    arrasto = { id: e.pointerId, x0: e.clientX, pos0: pos, ativo: false, ultX: e.clientX, ultT: e.timeStamp, v: 0 };
  });
  janela.addEventListener("pointermove", (e) => {
    if (!arrasto || e.pointerId !== arrasto.id) return;
    const dx = e.clientX - arrasto.x0;
    if (!arrasto.ativo) {
      if (Math.abs(dx) < 6) return;
      arrasto.ativo = true;
      arrasto.pos0 = pos + dx; // evita salto ao passar do limiar
      tween = null;
      try {
        janela.setPointerCapture(e.pointerId);
      } catch {
        // Sem captura o arrasto ainda funciona enquanto o ponteiro estiver na janela.
      }
      janela.classList.add("arrastando");
    }
    pos = arrasto.pos0 - dx;
    const dtMs = e.timeStamp - arrasto.ultT;
    if (dtMs > 0) {
      const v = (-(e.clientX - arrasto.ultX) / dtMs) * 1000;
      arrasto.v = arrasto.v * 0.6 + v * 0.4;
    }
    arrasto.ultX = e.clientX;
    arrasto.ultT = e.timeStamp;
  });
  function soltar(e) {
    if (!arrasto || e.pointerId !== arrasto.id) return;
    if (arrasto.ativo) {
      const segurouParado = e.timeStamp - arrasto.ultT > 100;
      vel = segurouParado ? 0 : Math.max(-VELOCIDADE_MAX_ARRASTO, Math.min(VELOCIDADE_MAX_ARRASTO, arrasto.v));
      janela.classList.remove("arrastando");
      suprimirClique = true;
      setTimeout(() => (suprimirClique = false), 0);
      segurar();
    }
    arrasto = null;
  }
  janela.addEventListener("pointerup", soltar);
  janela.addEventListener("pointercancel", soltar);
  janela.addEventListener("dragstart", (e) => e.preventDefault());
  janela.addEventListener(
    "click",
    (e) => {
      if (suprimirClique) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );

  // Roda ou trackpad na horizontal.
  janela.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      tween = null;
      vel = 0;
      pos += e.deltaX;
      segurar();
    },
    { passive: false }
  );

  // Mouse em cima: freia até parar, para dar tempo de ler e clicar.
  janela.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") mouseDentro = true;
  });
  janela.addEventListener("pointerleave", (e) => {
    if (e.pointerType === "mouse") mouseDentro = false;
  });

  // Foco de teclado: para e traz o card focado para a vista.
  janela.addEventListener("focusin", (e) => {
    focoDentro = e.target.matches(":focus-visible");
    const card = e.target.closest(".app-card");
    if (!focoDentro || !card) return;
    const alvo = card.offsetLeft - originais[0].offsetLeft;
    const para = alvo + largura * Math.round((pos - alvo) / largura);
    tween = { de: pos, para, inicio: agora(), duracao: 400 };
  });
  janela.addEventListener("focusout", (e) => {
    focoDentro = janela.contains(e.relatedTarget) && e.relatedTarget.matches(":focus-visible");
  });
  // O navegador pode rolar a janela sozinho ao focar um link; o transform é que manda.
  janela.addEventListener("scroll", () => (janela.scrollLeft = 0));

  // Fora da tela, não anima.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entrada]) => {
      visivel = entrada.isIntersecting;
    }).observe(carrossel);
  }

  window.addEventListener("resize", () => {
    medir();
    pos = embrulhar(pos);
  });
})();
