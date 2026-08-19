// About page entry point
import '../css/base.css';
import '../css/ken-burns.css';
import '../css/about.css';
import { mountShell } from '../js/shell.js';
import { markActiveNav, initStickyHeader, initScrollReveal } from '../js/site.js';
import { initKenBurns } from '../js/ken-burns.js';

mountShell();
markActiveNav();
initStickyHeader();
initScrollReveal();

// Init Ken Burns after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initKenBurns(document.querySelector('.ken-burns'), {
    duration: 8000,
    fade: 1500,
  });
});
