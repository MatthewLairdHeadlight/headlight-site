const NAV_ITEMS = [
  { id: 'home', href: '/index.html', label: 'Home' },
  { id: 'about', href: '/about.html', label: 'About' },
  { id: 'services', href: '/services.html', label: 'Services' },
  { id: 'appointments', href: '/appointments.html', label: 'Appointments' },
  { id: 'contact', href: '/contact.html', label: 'Contact' },
  { id: 'blog', href: '/blog.html', label: 'Blog' },
];

function renderBrand() {
  return `
    <span class="brand__mark" aria-hidden="true">
      <span class="brand__orb brand__orb--primary"></span>
      <span class="brand__orb brand__orb--secondary"></span>
    </span>
    <span class="brand__text">
      <span class="brand__name">Headlight</span>
      <span class="brand__sub">Mental Healthcare</span>
    </span>
  `;
}

function extractSlotMarkup(host, slotName) {
  return Array.from(host.querySelectorAll(`[slot="${slotName}"]`))
    .map((node) => {
      const clone = node.cloneNode(true);
      clone.removeAttribute('slot');
      return clone.outerHTML;
    })
    .join('');
}

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderNavLinks(active) {
  return NAV_ITEMS.map(({ id, href, label }) => {
    const current = active === id ? ' aria-current="page"' : '';
    return `<a class="nav-menu__link" href="${href}"${current}>${label}</a>`;
  }).join('');
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') ?? '';

    this.innerHTML = `
      <header class="site-header">
        <div class="container site-header__inner">
          <a class="brand" href="/index.html" aria-label="Headlight Mental Healthcare — home">
            ${renderBrand()}
          </a>

          <button
            class="nav-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="primary-navigation"
            aria-label="Toggle navigation menu"
          >
            <span class="nav-toggle__bar"></span>
            <span class="nav-toggle__bar"></span>
            <span class="nav-toggle__bar"></span>
          </button>

          <nav class="nav-menu" id="primary-navigation" aria-label="Primary">
            ${renderNavLinks(active)}
            <a class="btn btn--primary btn--sm" href="/appointments.html#intake">
              Request an Appointment
            </a>
          </nav>
        </div>
      </header>
    `;
  }
}

class PageBanner extends HTMLElement {
  connectedCallback() {
    const badge = this.getAttribute('badge');
    const title = escapeHtml(this.getAttribute('title') ?? '');
    const subtitle = escapeHtml(this.getAttribute('subtitle') ?? '');
    const finePrint = this.getAttribute('fine-print');
    const classes = ['hero', 'hero--centered', 'hero--page'];

    if (this.hasAttribute('compact')) classes.push('hero--compact');
    if (this.hasAttribute('full')) classes.push('hero--full');
    if (this.hasAttribute('overlap')) classes.push('hero--overlap');

    const actions = extractSlotMarkup(this, 'actions');
    const meta = extractSlotMarkup(this, 'meta');
    const showScroll = this.hasAttribute('scroll-hint');

    this.innerHTML = `
      <section class="${classes.join(' ')}">
        <div class="hero__ripple" aria-hidden="true"></div>
        <div class="container hero__inner">
          ${badge ? `<span class="hero__eyebrow reveal">${escapeHtml(badge)}</span>` : ''}
          <h1 class="hero__title reveal">${title}</h1>
          <p class="hero__subtitle reveal">${subtitle}</p>
          ${actions ? `<div class="btn-group hero__actions reveal">${actions}</div>` : ''}
          ${finePrint ? `<p class="hero__fine-print reveal">${escapeHtml(finePrint)}</p>` : ''}
          ${meta ? `<ul class="hero__meta reveal">${meta}</ul>` : ''}
        </div>
        ${
          showScroll
            ? `<div class="hero__scroll" aria-hidden="true">
                <span>Scroll</span>
                <span class="hero__scroll-line"></span>
              </div>`
            : ''
        }
      </section>
    `;
  }
}

class SiteCta extends HTMLElement {
  connectedCallback() {
    const eyebrow = this.getAttribute('eyebrow');
    const title = escapeHtml(this.getAttribute('title') ?? '');
    const text = escapeHtml(this.getAttribute('text') ?? '');
    const note = this.getAttribute('note');
    const actions = extractSlotMarkup(this, 'actions');

    this.innerHTML = `
      <section class="cta-section">
        <div class="container">
          <div class="cta-section__inner">
            ${
              eyebrow
                ? `<span class="cta-section__eyebrow reveal">${escapeHtml(eyebrow)}</span>`
                : ''
            }
            <h2 class="cta-section__title reveal">${title}</h2>
            <p class="cta-section__text reveal">${text}</p>
            ${actions ? `<div class="btn-group cta-section__actions reveal">${actions}</div>` : ''}
            ${note ? `<p class="cta-section__note reveal">${escapeHtml(note)}</p>` : ''}
          </div>
        </div>
      </section>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const currentYear = new Date().getFullYear();

    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="site-footer__grid">
            <div>
              <a class="brand" href="/index.html" aria-label="Headlight Mental Healthcare — home">
                ${renderBrand()}
              </a>
              <p class="site-footer__tagline">
                Board-certified psychiatric care for adults across Arizona and Oregon,
                with thoughtful support for anxiety, depression, OCD, ADHD, mood
                disorders, medication optimization, and addiction treatment.
              </p>
              <div class="site-footer__crisis" id="emergency-note">
                <strong>Mental health emergency?</strong> Call or text
                <a href="tel:988">988</a> or call <a href="tel:911">911</a> right away.
              </div>
            </div>

            <div>
              <div class="site-footer__heading">Explore</div>
              <nav class="site-footer__links" aria-label="Footer">
                ${NAV_ITEMS.map(
                  ({ href, label }) => `<a href="${href}">${label}</a>`,
                ).join('')}
              </nav>
            </div>

            <div>
              <div class="site-footer__heading">Locations &amp; Billing</div>
              <address class="site-footer__contact">
                <div>
                  <span class="site-footer__contact-label">Phoenix, Arizona</span>
                  In-person &amp; telehealth<br />
                  <a href="tel:+14806187023">(480) 618-7023</a>
                </div>
                <div>
                  <span class="site-footer__contact-label">Portland, Oregon</span>
                  In-person &amp; telehealth<br />
                  <a href="tel:+15415811080">(541) 581-1080</a>
                </div>
                <div>
                  <span class="site-footer__contact-label">Billing / Insurance</span>
                  <a href="tel:+15038776663">(503) 877-6663</a>
                </div>
              </address>
            </div>
          </div>

          <div class="site-footer__bottom">
            <span>© ${currentYear} Headlight Mental Healthcare</span>
            <div class="site-footer__legal">
              <a href="/contact.html#privacy-note">Privacy notice placeholder</a>
              <a href="/contact.html#accessibility-note">Accessibility note placeholder</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

export function defineSiteComponents() {
  if (!customElements.get('site-header')) {
    customElements.define('site-header', SiteHeader);
  }

  if (!customElements.get('page-banner')) {
    customElements.define('page-banner', PageBanner);
  }

  if (!customElements.get('site-cta')) {
    customElements.define('site-cta', SiteCta);
  }

  if (!customElements.get('site-footer')) {
    customElements.define('site-footer', SiteFooter);
  }
}
