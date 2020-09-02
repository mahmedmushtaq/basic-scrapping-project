const puppeteer = require('puppeteer');
const fs = require('fs');

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://accounts.craigslist.org/login');
  await page.type('input#inputEmailHandle', 'elompv@carpin.org');
  await page.type('input#inputPassword', 'mSJru9C2e9sYwiL');
  await page.click('button#login');
  await page.waitForNavigation();

  const content = await page.content();
  
}

main();
