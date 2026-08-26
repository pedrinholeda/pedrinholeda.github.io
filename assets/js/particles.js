document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("particles-js");
  if (!container || typeof particlesJS !== "function") return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) {
    container.remove();
    return;
  }

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const particleCount = isMobile ? 28 : 80;

  particlesJS("particles-js", {
    particles: {
      number: { value: particleCount, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: isMobile ? 3 : 5, random: true },
      line_linked: {
        enable: !isMobile,
        distance: 150,
        color: "#ffffff",
        opacity: 0.5,
        width: 1,
      },
      move: {
        enable: true,
        speed: isMobile ? 1 : 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: !isMobile, mode: "repulse" },
        onclick: { enable: !isMobile, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 200, line_linked: { opacity: 1 } },
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
});
