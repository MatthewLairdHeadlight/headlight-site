/**
 * Shared HTML fragments injected into pages via JS.
 * Keeps header/footer DRY across multi-page Vite builds.
 */

const baseUrl = import.meta.env.BASE_URL;

export const siteHeader = /* html */`
<header class="site-header" role="banner">
  <div class="container">
    <div class="site-header__inner">
      <a href="${baseUrl}" class="site-header__brand" aria-label="Headlight Mental Healthcare — Home">
        <span class="site-header__brand-name">Headlight Mental Healthcare</span>
        <span class="site-header__brand-tagline">Psychiatric Care · Phoenix, AZ &amp; Portland, OR</span>
      </a>
      <nav class="site-nav" role="navigation" aria-label="Main navigation">
        <a href="${baseUrl}">Home</a>
        <a href="${baseUrl}about/">About</a>
        <a href="${baseUrl}services/">Services</a>
        <a href="${baseUrl}contact/" class="site-nav__cta">Start Intake</a>
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
          in Phoenix, Arizona &amp; Portland, Oregon.
        </p>
        <p style="font-size:var(--text-sm); color:rgba(255,255,255,.55)">
          Matthew Laird, PMHNP-BC<br>
          Board Certified Psychiatric Nurse Practitioner
        </p>
      </div>
      <div>
        <p class="site-footer__heading">Navigate</p>
        <a href="${baseUrl}">Home</a>
        <a href="${baseUrl}about/">About Matthew</a>
        <a href="${baseUrl}services/">Services</a>
        <a href="${baseUrl}contact/">Contact</a>
        <a href="https://headlightmentalhealthcare.com/faqs/" target="_blank" rel="noopener">FAQs</a>
        <a href="https://headlightmentalhealthcare.com/communication-policy/" target="_blank" rel="noopener">Communication Policy</a>
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
          <a href="${baseUrl}contact/">Start Secure Intake</a><br>
          <a href="https://www.carecredit.com/go/253XCW/?dtc=DS1X&sitecode=h2mdo9bg10" target="_blank" rel="noopener">Financing via CareCredit®</a><br>
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
  initWaterBannerCanvas();
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
