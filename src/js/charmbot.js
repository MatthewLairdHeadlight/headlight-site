/**
 * CharmHealth Appointment Chat Bot loader.
 * Sets the window.charmbot configuration and injects the deferred vendor script.
 * Imported from shell.js so the bot loads site-wide on every page.
 */
export function initCharmbot() {
  window.charmbot = window.charmbot || {};
  window.charmbot.domain = 'https://ehr.charmtracker.com';
  window.charmbot.theme = 'bluetheme';
  window.charmbot.description = 'Welcome!';
  window.charmbot.introduction = "I can help current patients book an appointment online. New to Headlight? Please start at our contact page so we can make sure we're the right fit for your needs.";
  window.charmbot.info = '';

  const BOT_SRC = 'https://ehr.charmtracker.com/charmbot.do?method=startBot&client_id=ad5573370f326a1ad16c71e52458ab4fd74c6653a93eedd3a8262a6e6c2edd6cb838040879455ae0';
  if (document.querySelector(`script[src="${BOT_SRC}"]`)) return;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.defer = true;
  script.src = BOT_SRC;
  document.getElementsByTagName('head')[0].appendChild(script);
}
