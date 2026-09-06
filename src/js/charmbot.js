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
  window.charmbot.introduction = "I can help you request an appointment online — new and returning patients welcome. We'll confirm your time by text or email.";
  window.charmbot.info = '';

  const BOT_SRC = 'https://ehr.charmtracker.com/charmbot.do?method=startBot&client_id=ad5573370f326a1a87c51aa704b584e4077a162f163cddafa8262a6e6c2edd6cdedd4018a51ab9bf680f7b01dd6d0ca59509d6dbfe907f36a0ae868b6eb0918a';
  if (document.querySelector(`script[src="${BOT_SRC}"]`)) return;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.defer = true;
  script.src = BOT_SRC;
  document.getElementsByTagName('head')[0].appendChild(script);
}
