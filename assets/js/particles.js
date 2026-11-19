document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("particles-js");
  if (!container || typeof particlesJS !== "function") return;

  // Com "reduzir animações" ativo no sistema, as partículas continuam
  // aparecendo, mas se movem bem devagar e sem reagir ao mouse.
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const interactive = !isMobile && !prefersReducedMotion;

  let speed = isMobile ? 1 : 2;
  if (prefersReducedMotion) speed = 0.3;

  particlesJS("particles-js", {
    particles: {
      number: { value: isMobile ? 40 : 80, density: { enable: false } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: isMobile ? 3 : 5, random: true },
      line_linked: {
        enable: true,
        distance: isMobile ? 120 : 150,
        color: "#ffffff",
        opacity: isMobile ? 0.3 : 0.5,
        width: 1,
      },
      move: {
        enable: true,
        speed: speed,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: { enable: interactive, mode: "repulse" },
        onclick: { enable: interactive, mode: "push" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });

  // O particles.js mede o canvas só na inicialização e em resize da janela.
  // Se o hero mudar de tamanho depois (fontes, imagens, AOS), o canvas
  // ficaria esticado; então avisamos a biblioteca sempre que o container mudar.
  if ("ResizeObserver" in window) {
    let lastHeight = 0;
    new ResizeObserver(([entry]) => {
      const h = Math.round(entry.contentRect.height);
      if (h !== lastHeight) {
        lastHeight = h;
        window.dispatchEvent(new Event("resize"));
      }
    }).observe(container);
  }
});
