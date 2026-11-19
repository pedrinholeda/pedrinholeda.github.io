// Rolagem animada entre seções.
// Feita em JS porque o Chrome/Edge no Windows desligam o "scroll-behavior: smooth"
// quando as animações do sistema estão desativadas.
(function () {
  let frame = null;

  function headerOffset() {
    return parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function cancel() {
    if (frame) cancelAnimationFrame(frame);
    frame = null;
  }

  function smoothScrollTo(targetY) {
    cancel();
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const endY = Math.max(0, Math.min(targetY, maxY));
    const startY = window.scrollY;
    const distance = endY - startY;
    if (Math.abs(distance) < 2) return;

    // Duração proporcional à distância, entre 450ms e 1100ms
    const duration = Math.min(1100, Math.max(450, Math.abs(distance) * 0.5));
    const startTime = performance.now();

    function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      window.scrollTo(0, startY + distance * easeInOutCubic(t));
      frame = t < 1 ? requestAnimationFrame(step) : null;
    }
    frame = requestAnimationFrame(step);
  }

  function scrollToElement(el) {
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset();
    smoothScrollTo(el.id === "inicio" ? 0 : y);
  }

  // Usuário rolou por conta própria: interrompe a animação
  ["wheel", "touchstart", "keydown"].forEach((evt) =>
    window.addEventListener(evt, cancel, { passive: true })
  );

  // Links internos (#secao)
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link || link.classList.contains("skip-link") || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const id = link.getAttribute("href").slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    // Espera o menu mobile fechar (libera a rolagem do body) antes de animar
    requestAnimationFrame(() => scrollToElement(target));
    history.pushState(null, "", "#" + id);
  });

  window.smoothScrollTo = smoothScrollTo;
  window.scrollToSection = function (id) {
    const target = document.getElementById(id);
    if (target) scrollToElement(target);
  };
})();
