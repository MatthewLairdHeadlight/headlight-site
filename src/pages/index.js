// Home page entry point
import '../css/base.css';
import { mountShell } from '../js/shell.js';
import { markActiveNav, initStickyHeader } from '../js/site.js';

mountShell();
markActiveNav();
initStickyHeader();
