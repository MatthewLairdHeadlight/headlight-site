import { initWaterBackground } from './water-bg.js';
import { initScrollReveal } from './scroll-reveal.js';
import { defineSiteComponents } from './site-components.js';

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
  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    const status = form.querySelector('.form__status');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (status) {
        status.classList.remove('form__status--visible');
      }
      if (!form.reportValidity()) return;

      if (status) {
        status.textContent =
          form.dataset.statusMessage ||
          'This form is a front-end placeholder only. No information is being sent yet — please connect a HIPAA-compliant backend before collecting patient details.';
        status.classList.add('form__status--visible');
      }
    });
  });
}

function initFooterYear() {
  document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

document.addEventListener('DOMContentLoaded', () => {
  defineSiteComponents();
  initWaterBackground();
  initScrollReveal();
  initMobileNav();
  initHeaderScrollState();
  initContactForm();
  initFooterYear();
});
