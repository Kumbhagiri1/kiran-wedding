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

  // 1. Screenshot of Opening Modal with Couple Photo
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

  // 4. Capture dedicated section screenshot of Couple Profiles (#couple)
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

  // 5b. Capture dedicated section screenshot of Guest Accommodation (#accommodation)
  const accomEl = await page.$('#accommodation');
  if (accomEl) {
    await accomEl.screenshot({ path: path.join(outDir, '06-guest-accommodation.png') });
    console.log('Captured 06-guest-accommodation.png');
  }

  // 5c. Capture dedicated footer with Royal Procession & Dhol theme
  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({ path: path.join(outDir, '07-royal-procession-footer.png') });
    console.log('Captured 07-royal-procession-footer.png');
  }

  // 5d. Test clicking "Theen Maar" or "Play Theen Maar" button to start dancing!
  const dholBtn = await page.$('button::-p-text(Play Theen Maar)');
  if (dholBtn) {
    await dholBtn.click();
    console.log('Clicked Play Theen Maar drum button.');
    await new Promise(r => setTimeout(r, 600));
    await footerEl.screenshot({ path: path.join(outDir, '09-dancing-live-stage.png') });
    console.log('Captured 09-dancing-live-stage.png (Live Dancing Front View)');
  }

  // 6. Test Mobile Viewport (iPhone 14 - 390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '04-mobile-full.png'), fullPage: true });
  console.log('Captured 04-mobile-full.png');

  const mobileFooterEl = await page.$('footer');
  if (mobileFooterEl) {
    await mobileFooterEl.screenshot({ path: path.join(outDir, '08-mobile-footer.png') });
    console.log('Captured 08-mobile-footer.png');
  }

  // 7. Verify elements presence
  const pageContent = await page.content();
  const checks = [
    "KRISHNA KALYANAMANDAPAM",
    "Sri Lakshman",
    "7207374807",
    "7659098055",
    "7093694475",
    "HALDI &amp; MUSIC CEREMONY",
    "01 DECEMBER 2026",
    "Guest Arrival: 04:00 PM",
    "WEDDING CEREMONY",
    "02 DECEMBER 2026",
    "09:04 AM – 09:37 AM",
    "GUEST ACCOMMODATION",
    "24 air-conditioned rooms",
    "Kindly contact the family in advance for room reservations.",
    "We look forward to welcoming you!",
    "GANGALLA MAHESWARI",
    "Kalyanam Vaibhogam",
    "og-couple.jpg",
    "tempered-skyblue-squid-71.hostingersite.com",
    "Sri Kadapa Babu",
    "Sri Raju (Agape)",
    "Chi. Sou. Jerusha",
    "Chi. Sou. Kadapa Parvathi",
    "Sri Hari",
    "Sri Harsha",
    "Sri Uday",
    "Sri Devara Jaganadha Rao",
    "Sri Devara Vishnu Vardhan Rao",
    "Sri Devara Kalyan",
    "Sri Devara Vijay Rama Rao",
    "Sri Devara Subbarayudu",
    "Sri Dakshina Murthy Namah",
    "Royal Wedding Procession",
    "Theen Maar",
    "Bhutto Beat",
    "Hyderabad Marfa",
    "Royal Pelli Baaja",
    "తీన్ మార్",
    "భుట్టో",
    "మర్ఫా",
    "Dhol Bass (Dhum)",
    "High Slap (Takk)",
    "Tutari Fanfare"
  ];

  const subbaIdx = pageContent.indexOf("Sri Devara Subbarayudu");
  const venkatIdx = pageContent.indexOf("Sri Kumbhagiri Venkateshwarlu");
  if (subbaIdx === -1 || venkatIdx === -1 || subbaIdx > venkatIdx) {
    throw new Error(`Order verification failed! Subbarayudu index: ${subbaIdx}, Venkateshwarlu index: ${venkatIdx}`);
  }
  console.log('Order verification: Sri Devara Subbarayudu appears BEFORE Sri Kumbhagiri Venkateshwarlu (PASS)');

  const umaIdx = pageContent.indexOf("Sri Uma Maheshwarabhyam Namah");
  const dakshinaIdx = pageContent.indexOf("Sri Dakshina Murthy Namah");
  if (umaIdx === -1 || dakshinaIdx === -1 || umaIdx > dakshinaIdx) {
    throw new Error(`Order verification failed! Uma index: ${umaIdx}, Dakshina index: ${dakshinaIdx}`);
  }
  console.log('Order verification: Sri Dakshina Murthy Namah appears AFTER Sri Uma Maheshwarabhyam Namah (PASS)');

  if (pageContent.includes("MAHESHWARI") || pageContent.includes("Maheshwari")) {
    throw new Error("Found old spelling Maheshwari in page content!");
  }

  if (pageContent.includes("Kumbhagiri Subbarayudu") || pageContent.includes("Kumbhagiri Subba Rayudu")) {
    throw new Error("Found removed name Kumbhagiri Subbarayudu in page content!");
  }

  for (const c of checks) {
    const hasText = pageContent.includes(c);
    console.log(`Verification [${c}]: ${hasText ? 'PASS' : 'FAIL'}`);
    if (!hasText) {
      throw new Error(`Missing expected text: ${c}`);
    }
  }

  await browser.close();
  console.log('All tests and visual captures completed successfully!');
}

testWebsite().catch(err => {
  console.error('Error during testing:', err);
  process.exit(1);
});
