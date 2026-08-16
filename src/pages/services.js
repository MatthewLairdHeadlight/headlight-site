// Services page entry point
import '../css/base.css';
import '../css/services.css';
import { mountShell } from '../js/shell.js';
import { markActiveNav, initStickyHeader } from '../js/site.js';

mountShell();
markActiveNav();
initStickyHeader();
