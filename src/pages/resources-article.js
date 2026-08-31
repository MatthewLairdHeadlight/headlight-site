// Resources article page entry point (shared by all articles)
import '../css/base.css';
import '../css/resources.css';
import { mountShell } from '../js/shell.js';
import { markActiveNav, initStickyHeader, initScrollReveal } from '../js/site.js';

mountShell();
markActiveNav();
initStickyHeader();
initScrollReveal();
