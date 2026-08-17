/**
 * Ken Burns slideshow controller.
 * Cycles through .kb-slide elements with slow pan/zoom + crossfade.
 *
 * @param {HTMLElement} container  - .ken-burns element
 * @param {Object}      opts
 * @param {number}      opts.duration  - ms per slide (default 8000)
 * @param {number}      opts.fade      - ms for crossfade (default 1500)
 */
export function initKenBurns(container, opts = {}) {
  if (!container) return;

  const slides = Array.from(container.querySelectorAll('.kb-slide'));
  if (slides.length === 0) return;

  const duration = opts.duration ?? 8000;
  const fade     = opts.fade     ?? 1500;
  const animCount = 8; // matches kb-anim-0 … kb-anim-7

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Just slow-fade with a much longer hold; no pan/zoom
    fadeCycle(slides, duration * 1.5, fade * 2);
    return;
  }

  let current = 0;
  let animIdx = 0;

  // Activate first slide immediately
  activateSlide(slides[current], animIdx);

  let timer = setInterval(advance, duration);

  function advance() {
    const prev = current;
    current = (current + 1) % slides.length;
    animIdx  = (animIdx  + 1) % animCount;

    const prevSlide = slides[prev];
    const nextSlide = slides[current];

    // Mark outgoing
    prevSlide.classList.add('is-leaving');
    prevSlide.classList.remove('is-active');

    // Activate incoming
    activateSlide(nextSlide, animIdx);

    // Clean leaving after fade completes
    setTimeout(() => {
      prevSlide.classList.remove('is-leaving');
      // Remove anim class from prev so it resets on next cycle
      for (let i = 0; i < animCount; i++) prevSlide.classList.remove(`kb-anim-${i}`);
    }, fade);
  }

  function activateSlide(slide, aIdx) {
    // Reset any previous anim classes
    for (let i = 0; i < animCount; i++) slide.classList.remove(`kb-anim-${i}`);
    // Force reflow so animation restarts
    void slide.offsetWidth;
    slide.classList.add(`kb-anim-${aIdx}`);
    slide.classList.add('is-active');
    slide.classList.remove('is-leaving');
  }

  // Pause when tab is hidden to save CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      timer = setInterval(advance, duration);
    }
  });
}

/** Simpler fade-only cycle for reduced-motion */
function fadeCycle(slides, duration, fade) {
  let current = 0;
  slides[current].classList.add('is-active');

  setInterval(() => {
    const prev = current;
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
    slides[prev].classList.add('is-leaving');
    slides[prev].classList.remove('is-active');
    setTimeout(() => slides[prev].classList.remove('is-leaving'), fade);
  }, duration);
}
