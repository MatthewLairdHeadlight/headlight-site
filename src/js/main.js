import { initWaterBackground } from './water-bg.js';
import { initScrollReveal } from './scroll-reveal.js';

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggle || !navMenu) return;

  const close = () => {
    navMenu.classList.remove('nav-menu--open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('nav-menu--open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) close();
  });
}

function initHeaderScrollState() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const update = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 12);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector('.form__status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    // No backend yet — point this at a form service (Formspree, Netlify Forms,
    // your EHR intake endpoint) when the real integration is ready.
    if (status) {
      const name = form.querySelector('#name')?.value.trim();
      status.textContent = name
        ? `Thank you, ${name}. Your message has been received — a care coordinator will reach out within one business day.`
        : 'Thank you. Your message has been received — a care coordinator will reach out within one business day.';
      status.classList.add('form__status--visible');
    }
    form.reset();
  });
}

function initFooterYear() {
  document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initWaterBackground();
  initScrollReveal();
  initMobileNav();
  initHeaderScrollState();
  initContactForm();
  initFooterYear();
});
