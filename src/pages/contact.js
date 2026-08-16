// Contact page entry point
import '../css/base.css';
import '../css/contact.css';
import { mountShell } from '../js/shell.js';
import { markActiveNav, initStickyHeader } from '../js/site.js';

mountShell();
markActiveNav();
initStickyHeader();

// Simple form feedback (no backend yet — just UX)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.innerHTML = `
      <div style="text-align:center;padding:var(--space-12) var(--space-8)">
        <div style="font-size:3rem;margin-bottom:var(--space-4)">✅</div>
        <h3 style="font-size:var(--text-2xl);color:var(--color-blue-800);margin-bottom:var(--space-4)">Request Received</h3>
        <p style="color:var(--color-text-muted);line-height:var(--leading-relaxed)">
          Thank you — Matthew will follow up within one business day.
          If it's urgent, please call <a href="tel:+15036254357" style="color:var(--color-blue-600)">(503) 625-4357</a>.
        </p>
      </div>
    `;
  });
});
