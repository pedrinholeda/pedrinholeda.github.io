document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("backToTop");
  const whatsappButton = document.getElementById("whatsappButton");

  if (!backToTopButton) return;

  let ticking = false;
  let hideTimer = null;

  function toggleButtons() {
    const shouldShow = window.scrollY > 100;
    if (shouldShow) {
      backToTopButton.style.display = "flex";
      if (whatsappButton) whatsappButton.style.display = "flex";
      requestAnimationFrame(() => {
        backToTopButton.style.opacity = "1";
        if (whatsappButton) whatsappButton.style.opacity = "1";
      });
    } else {
      backToTopButton.style.opacity = "0";
      if (whatsappButton) whatsappButton.style.opacity = "0";
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (window.scrollY <= 100) {
          backToTopButton.style.display = "none";
          if (whatsappButton) whatsappButton.style.display = "none";
        }
      }, 500);
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      toggleButtons();
      ticking = false;
    });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.addEventListener("scroll", onScroll, { passive: true });

  backToTopButton.addEventListener("click", scrollToTop);
  backToTopButton.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  });

  if (whatsappButton) {
    whatsappButton.addEventListener("click", function () {
      window.location.href = "https://wa.me/5599999999999";
    });
  }
});
