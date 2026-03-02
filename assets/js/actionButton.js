document.addEventListener('DOMContentLoaded', function () {
  const backToTopButton = document.getElementById('backToTop');
  const whatsappButton = document.getElementById('whatsappButton');

  if (!backToTopButton) return;

  // Função para exibir ou esconder os botões ao rolar a página
  function toggleButtons() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      backToTopButton.style.display = 'flex';
      if (whatsappButton) whatsappButton.style.display = 'flex';
      setTimeout(() => {
        backToTopButton.style.opacity = '1';
        if (whatsappButton) whatsappButton.style.opacity = '1';
      }, 10);
    } else {
      backToTopButton.style.opacity = '0';
      if (whatsappButton) whatsappButton.style.opacity = '0';
      setTimeout(() => {
        backToTopButton.style.display = 'none';
        if (whatsappButton) whatsappButton.style.display = 'none';
      }, 500);
    }
  }

  document.addEventListener('scroll', toggleButtons);

  backToTopButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (whatsappButton) {
    whatsappButton.addEventListener('click', function () {
      window.location.href = 'https://wa.me/5599999999999';
    });
  }
});
