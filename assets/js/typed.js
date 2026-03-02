document.addEventListener("DOMContentLoaded", function () {
  const typedEl = document.querySelector(".typed");
  if (!typedEl) return;

  const getStrings = () =>
    window.getI18n?.().typedStrings ?? ["Frontend", "Mobile", "iOS"];

  let typedInstance = new Typed(typedEl, {
    strings: getStrings(),
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1500,
    startDelay: 500,
    loop: true,
    showCursor: true,
  });

  window.addEventListener("langChange", function () {
    typedInstance.destroy();
    typedInstance = new Typed(typedEl, {
      strings: getStrings(),
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: true,
    });
  });
});
