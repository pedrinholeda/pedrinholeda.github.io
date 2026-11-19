// Botão "voltar ao topo": aparece depois de rolar um pouco a página
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("backToTop");
  if (!backToTopButton) return;

  let ticking = false;
  let hideTimer = null;

  function toggleButton() {
    if (window.scrollY > 100) {
      clearTimeout(hideTimer);
      backToTopButton.style.display = "flex";
      requestAnimationFrame(() => {
        backToTopButton.style.opacity = "1";
      });
    } else {
      backToTopButton.style.opacity = "0";
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (window.scrollY <= 100) backToTopButton.style.display = "none";
      }, 500);
    }
  }

  document.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        toggleButton();
        ticking = false;
      });
    },
    { passive: true }
  );

  backToTopButton.addEventListener("click", () => {
    window.smoothScrollTo(0);
  });
});
