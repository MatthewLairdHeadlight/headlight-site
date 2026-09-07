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
  window.charmbot.introduction = "I am your virtual appointment bot to assist you in booking appointment.";
  window.charmbot.info = "Hello! To schedule an appointment, Click Here.";

  const BOT_SRC = 'https://ehr.charmtracker.com/charmbot.do?method=startBot&client_id=ad5573370f326a1a0c53e363a880aa42046db77fdfdb5a8fa8262a6e6c2edd6cb838040879455ae0';
  if (document.querySelector(`script[src="${BOT_SRC}"]`)) return;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.defer = true;
  script.src = BOT_SRC;
  document.getElementsByTagName('head')[0].appendChild(script);
}
