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
  window.charmbot.introduction = "I'm your virtual assistant — I can help you book an appointment.";
  window.charmbot.info = 'Hello! Need an appointment? Click here.';

  const BOT_SRC = 'https://ehr.charmtracker.com/charmbot.do?method=startBot&client_id=ad5573370f326a1ad16c71e52458ab4fd74c6653a93eedd3a8262a6e6c2edd6cb838040879455ae0';
  if (document.querySelector(`script[src="${BOT_SRC}"]`)) return;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.defer = true;
  script.src = BOT_SRC;
  document.getElementsByTagName('head')[0].appendChild(script);
}
