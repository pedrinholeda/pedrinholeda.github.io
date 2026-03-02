document.addEventListener('DOMContentLoaded', function () {
  const headlineScroll = document.getElementById('headline-scroll');
  if (!headlineScroll) return;

  const clone = headlineScroll.cloneNode(true);
  headlineScroll.parentNode.appendChild(clone);

  const scrollWidth = headlineScroll.scrollWidth;
  headlineScroll.style.width = `${scrollWidth}px`;
  clone.style.width = `${scrollWidth}px`;
});
