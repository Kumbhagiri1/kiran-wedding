const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function testWebsite() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  const outDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  // 1. Screenshot of Opening Modal
  await page.screenshot({ path: path.join(outDir, '01-opening-modal.png') });
  console.log('Captured 01-opening-modal.png');

  // 2. Click "Open Royal Invitation"
  const openBtn = await page.waitForSelector('button::-p-text(Open Royal Invitation)');
  if (openBtn) {
    await openBtn.click();
    console.log('Clicked Open Royal Invitation button.');
    await new Promise(r => setTimeout(r, 1000));
  }

  // 3. Desktop full-page screenshot
  await page.screenshot({ path: path.join(outDir, '02-desktop-full.png'), fullPage: true });
  console.log('Captured 02-desktop-full.png');

  // 4. Capture dedicated section screenshot of Couple Profiles (#couple) with Groom Photo
  const coupleEl = await page.$('#couple');
  if (coupleEl) {
    await coupleEl.screenshot({ path: path.join(outDir, '05-couple-profiles-with-photo.png') });
    console.log('Captured 05-couple-profiles-with-photo.png');
  }

  // 5. Capture dedicated section screenshot of Two-Day Itinerary (#itinerary)
  const itineraryEl = await page.$('#itinerary');
  if (itineraryEl) {
    await itineraryEl.screenshot({ path: path.join(outDir, '03-two-day-itinerary.png') });
    console.log('Captured 03-two-day-itinerary.png');
  }

  // 6. Test Mobile Viewport (iPhone 14 - 390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '04-mobile-full.png'), fullPage: true });
  console.log('Captured 04-mobile-full.png');

  await browser.close();
  console.log('All tests and visual captures completed successfully!');
}

testWebsite().catch(err => {
  console.error('Error during testing:', err);
  process.exit(1);
});
