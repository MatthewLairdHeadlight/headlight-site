/**
 * "Drip" entrance animation: elements marked with `.reveal` fade and rise into
 * place as they enter the viewport, staggered slightly so groups of cards land
 * one after another like drops.
 */
export function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity var(--transition-drip), transform var(--transition-drip);
      will-change: opacity, transform;
    }
    .reveal.revealed {
      opacity: 1;
      transform: translateY(0);
      will-change: auto;
    }
    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1; transform: none; transition: none; }
    }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll('.reveal');
  const revealOrder = new Map(Array.from(targets).map((el, index) => [el, index % 6]));

  if (prefersReduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        const delay = (revealOrder.get(entry.target) ?? index) * 80;
        window.setTimeout(() => entry.target.classList.add('revealed'), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}
