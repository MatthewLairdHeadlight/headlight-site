/**
 * Shared HTML fragments injected into pages via JS.
 * Keeps header/footer DRY across multi-page Vite builds.
 */

export const siteHeader = /* html */`
<header class="site-header" role="banner">
  <div class="container">
    <div class="site-header__inner">
      <a href="/" class="site-header__brand" aria-label="Headlight Mental Healthcare — Home">
        <span class="site-header__brand-name">Headlight Mental Healthcare</span>
        <span class="site-header__brand-tagline">Psychiatric Care · Portland, OR</span>
      </a>
      <nav class="site-nav" role="navigation" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/about/">About</a>
        <a href="/services/">Services</a>
        <a href="/contact/" class="site-nav__cta">Request Appointment</a>
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
        <div class="site-footer__brand-name">Headlight Mental Healthcare</div>
        <p class="site-footer__tagline">
          Compassionate, evidence-based psychiatric care<br>
          in Portland, Oregon.
        </p>
        <p style="font-size:var(--text-sm); color:rgba(255,255,255,.55)">
          Matthew Laird, PMHNP-BC<br>
          Board Certified Psychiatric Nurse Practitioner
        </p>
      </div>
      <div>
        <p class="site-footer__heading">Navigate</p>
        <a href="/">Home</a>
        <a href="/about/">About Matthew</a>
        <a href="/services/">Services</a>
        <a href="/contact/">Contact</a>
      </div>
      <div>
        <p class="site-footer__heading">Contact</p>
        <a href="tel:+15036254357">(503) 625-4357</a>
        <a href="/contact/">Request an Appointment</a>
        <p style="font-size:var(--text-xs);color:rgba(255,255,255,.4);margin-top:var(--space-4);line-height:1.6">
          Portland, Oregon<br>
          Telehealth Available
        </p>
      </div>
    </div>
    <div class="site-footer__bottom">
      <span>© ${new Date().getFullYear()} Headlight Mental Healthcare · Matthew Laird, PMHNP-BC</span>
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
}
