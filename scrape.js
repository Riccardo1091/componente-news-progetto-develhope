import { launch } from 'puppeteer';
let t;
export default t;

const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];

// delay function
function waitFor(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

(async () => {
  // Attivazione browser
  const browser = await launch({headless: false, args: minimal_args})
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080})
  
  // Navigazione verso pagina artista
  await page.goto(`https://www.everyeye.it/ricerca/?q=wild%20hearts&news=1`, {waitUntil: 'networkidle0'})
  // Click cookie notice
  let n = await page.$(".testi_notizia")
  t = await (await n.getProperty('textContent')).jsonValue()  
  // module.exports = {"t": t
  
    //await browser.close()
})();