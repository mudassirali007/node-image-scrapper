const puppeteer = require("puppeteer");

async function startBrowser() {
  let browser;
  try {
    console.log("Opening the browser......");
    // browser = await puppeteer.launch();
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
}

async function closeBrowser(browser) {
  await browser.close();
}

module.exports = {
  startBrowser,
  closeBrowser,
};
