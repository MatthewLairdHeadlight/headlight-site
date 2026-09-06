/**
 * Shared HTML fragments injected into pages via JS.
 * Keeps header/footer DRY across multi-page Vite builds.
 */
import { initCharmbot } from './charmbot.js';

const baseUrl = import.meta.env.BASE_URL;
const THEME_STORAGE_KEY = 'theme';

/* ── Inline SVG helpers ─────────────────────────────────────────────────── */
const phoneIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="16" height="16"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

export const siteHeader = /* html */`
<header class="site-header" role="banner">
  <div class="container">
    <div class="site-header__inner">
      <a href="${baseUrl}" class="site-header__brand" aria-label="Headlight Mental Healthcare — Home">
        <img
          src="${baseUrl}images/logo.svg"
          alt="Headlight Mental Healthcare"
          class="site-header__logo"
          width="180"
          height="55"
        />
        <span class="site-header__brand-tagline">Psychiatric Care · Phoenix, AZ &amp; Portland, OR</span>
      </a>
      <nav class="site-nav" role="navigation" aria-label="Main navigation">
        <a href="${baseUrl}">Home</a>
        <a href="${baseUrl}about/">About</a>
        <a href="${baseUrl}services/">Services</a>
        <a href="${baseUrl}faqs/">FAQs</a>
        <a href="${baseUrl}genesight/">GeneSight</a>
        <a href="${baseUrl}resources/">Resources</a>
        <button
          type="button"
          class="site-theme-toggle"
          data-theme-toggle
          aria-label="Switch to dark theme"
          aria-pressed="false"
        >
          <svg class="site-theme-toggle__icon site-theme-toggle__icon--sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"/></svg>
          <svg class="site-theme-toggle__icon site-theme-toggle__icon--moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3c-.03.2-.04.4-.04.61A7.5 7.5 0 0 0 18.67 11.1c.78 0 1.53-.12 2.23-.31.07.64.1 1.3.1 2Z"/></svg>
        </button>
        <a href="${baseUrl}contact/" class="site-nav__cta">Book / Contact</a>
      </nav>
    </div>
  </div>
</header>
`;

export const siteFooter = /* html */`
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="site-footer__inner">
      <div>
        <a href="${baseUrl}" aria-label="Headlight Mental Healthcare — Home">
          <img
            src="${baseUrl}images/logo.svg"
            alt="Headlight Mental Healthcare"
            class="site-footer__logo"
            width="160"
            height="49"
          />
        </a>
        <p class="site-footer__tagline">
          Compassionate, evidence-based psychiatric care<br>
          in Phoenix, Arizona &amp; Portland, Oregon.
        </p>
        <p style="font-size:var(--text-sm); color:rgba(255,255,255,.55)">
          Matthew Laird, PMHNP-BC<br>
          Board Certified Psychiatric Nurse Practitioner
        </p>
        <div class="site-footer__pt-link">
          <a href="https://www.psychologytoday.com/us/psychiatrists/headlight-mental-healthcare-pllc-phoenix-az/1234382" target="_blank" rel="noopener noreferrer" class="site-footer__pt-badge" aria-label="View profile on Psychology Today (opens in new tab)">
            <img src="${baseUrl}images/psychology-today-badge.png" alt="Psychology Today" loading="lazy" />
          </a>
        </div>
      </div>
      <div>
        <p class="site-footer__heading">Navigate</p>
        <a href="${baseUrl}">Home</a>
        <a href="${baseUrl}about/">About Matthew</a>
        <a href="${baseUrl}services/">Services</a>
        <a href="${baseUrl}faqs/">FAQs</a>
        <a href="${baseUrl}genesight/">GeneSight</a>
        <a href="${baseUrl}resources/">Resources</a>
        <a href="${baseUrl}contact/">Book / Contact</a>
        <a href="https://headlightmentalhealthcare.com/communication-policy/" target="_blank" rel="noopener noreferrer">Communication Policy</a>
      </div>
      <div>
        <p class="site-footer__heading">Phoenix, AZ Office</p>
        <p style="font-size:var(--text-xs);color:rgba(255,255,255,.55);line-height:1.6;margin-bottom:var(--space-2)">
          Headlight Mental Healthcare, PLLC<br>
          2 N Central Ave, Suite 1800<br>
          Phoenix, AZ 85004
        </p>
        <a href="tel:+14806187023">480-618-7023</a>
        <span style="display:block;font-size:var(--text-xs);color:rgba(255,255,255,.4)">Fax: (480) 781-4866</span>
        <a href="mailto:welcome@headlightmentalhealthcare.com">welcome@headlightmentalhealthcare.com</a>
      </div>
      <div>
        <p class="site-footer__heading">Portland, OR Office</p>
        <p style="font-size:var(--text-xs);color:rgba(255,255,255,.55);line-height:1.6;margin-bottom:var(--space-2)">
          Headlight Mental Healthcare, LLC<br>
          555 SE MLK Blvd, Unit 105<br>
          Portland, OR 97214
        </p>
        <a href="tel:+15415811080">541-581-1080</a>
        <span style="display:block;font-size:var(--text-xs);color:rgba(255,255,255,.4)">Fax: 541-588-6525</span>
        <a href="mailto:welcome@headlightmentalhealthcare.com">welcome@headlightmentalhealthcare.com</a>
        <p style="font-size:var(--text-xs);color:rgba(255,255,255,.4);margin-top:var(--space-4)">
          <a href="${baseUrl}contact/">Book an Appointment</a><br>
          Telehealth Available
        </p>
      </div>
    </div>
    <div class="site-footer__bottom">
      <div class="site-footer__meta">
        <span>© ${new Date().getFullYear()} Headlight Mental Healthcare · Matthew Laird, PMHNP-BC</span>
        <p class="site-footer__sms">
          SMS notifications are used for appointments and care. Message frequency may vary, and standard message/data rates may apply. Reply STOP to opt out or HELP for assistance. Details are available in the <a href="${baseUrl}privacy-policy/">Privacy Policy</a>.
        </p>
      </div>
      <p class="site-footer__disclaimer">
        This site is for informational purposes only and does not constitute medical advice.
        If you are experiencing a mental health emergency, call 988 (Suicide &amp; Crisis Lifeline)
        or 911.
      </p>
    </div>
  </div>
</footer>
`;

export function mountShell() {
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');
  if (headerSlot) headerSlot.outerHTML = siteHeader;
  if (footerSlot) footerSlot.outerHTML = siteFooter;
  initThemeToggle();
  initWaterBannerCanvas();
  initCharmbot();
}

function getStoredTheme() {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

function getPreferredTheme() {
  const stored = getStoredTheme();
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function updateThemeToggleState(toggle, theme) {
  const isDark = theme === 'dark';
  toggle.setAttribute('aria-pressed', String(isDark));
  toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

function initThemeToggle() {
  const toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;

  const root = document.documentElement;
  const initialTheme = root.getAttribute('data-theme');
  const currentTheme = initialTheme === 'light' || initialTheme === 'dark'
    ? initialTheme
    : getPreferredTheme();
  applyTheme(currentTheme);
  updateThemeToggleState(toggle, currentTheme);

  toggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // no-op (storage unavailable)
    }
    updateThemeToggleState(toggle, nextTheme);
  });

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const syncSystemPreference = (event) => {
    if (getStoredTheme()) return;
    const nextTheme = event.matches ? 'dark' : 'light';
    applyTheme(nextTheme);
    updateThemeToggleState(toggle, nextTheme);
  };

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', syncSystemPreference);
  }

  window.requestAnimationFrame(() => root.classList.add('theme-ready'));
}

function initWaterBannerCanvas() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.page-banner').forEach((banner) => {
    if (banner.querySelector('.page-banner__waterfx')) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'page-banner__waterfx';
    canvas.setAttribute('aria-hidden', 'true');

    const scrim = banner.querySelector('.page-banner__scrim');
    banner.insertBefore(canvas, scrim ?? banner.firstChild);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId = 0;
    let width = 0;
    let height = 0;
    let phase = Math.random() * Math.PI * 2;

    const resize = () => {
      const rect = banner.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(122, 184, 245, 0.08)');
      gradient.addColorStop(1, 'rgba(45, 212, 191, 0.04)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 5; i += 1) {
        const amplitude = height * (0.015 + i * 0.006);
        const yOffset = height * (0.28 + i * 0.11);
        const frequency = 0.012 + i * 0.0018;
        const speed = 0.012 + i * 0.003;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const y = yOffset + Math.sin((x * frequency) + phase + (i * 0.85)) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(186, 230, 253, ${0.08 + i * 0.025})`;
        ctx.lineWidth = 1.2 + i * 0.3;
        ctx.stroke();
      }

      phase += 0.015;
      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frameId);
      } else {
        window.cancelAnimationFrame(frameId);
        draw();
      }
    });
  });
}
