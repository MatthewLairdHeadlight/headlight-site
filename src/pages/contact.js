// Contact page entry point
import '../css/base.css';
import '../css/contact.css';
import { mountShell } from '../js/shell.js';
import { markActiveNav, initStickyHeader, initScrollReveal } from '../js/site.js';

mountShell();
markActiveNav();
initStickyHeader();
initScrollReveal();
initBookingTabs();

function initBookingTabs() {
  const tabList = document.querySelector('[data-booking-tabs]');
  if (!tabList) return;

  const tabs = Array.from(tabList.querySelectorAll('[data-booking-tab]'));
  const panels = tabs.map((tab) => {
    const panelId = tab.getAttribute('aria-controls');
    return panelId ? document.getElementById(panelId) : null;
  });
  const fallbackLink = document.querySelector('[data-booking-fallback]');

  const activateTab = (nextIndex, shouldFocus = false) => {
    tabs.forEach((tab, index) => {
      const isActive = index === nextIndex;
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;

      const panel = panels[index];
      if (!panel) return;
      panel.hidden = !isActive;

      if (isActive) {
        const iframe = panel.querySelector('iframe');
        if (iframe && !iframe.getAttribute('src')) {
          const pendingSrc = iframe.getAttribute('data-src');
          if (pendingSrc) iframe.setAttribute('src', pendingSrc);
        }

        if (fallbackLink && iframe) {
          const activeHref = iframe.getAttribute('src') || iframe.getAttribute('data-src');
          if (activeHref) fallbackLink.setAttribute('href', activeHref);
        }
      }
    });

    if (shouldFocus) tabs[nextIndex]?.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(index, false));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateTab(nextIndex, true);
    });
  });

  const selectedIndex = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
  activateTab(selectedIndex >= 0 ? selectedIndex : 0, false);
}
