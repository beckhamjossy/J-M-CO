import { test } from '@playwright/test';

test.setTimeout(120000); // 2 minutes

test('capture screenshots', async ({ page }) => {
  // Set viewport for desktop
  await page.setViewportSize({ width: 1280, height: 1440 });

  // Helper to scroll down to trigger animations
  const scrollDown = async () => {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 300; // Increased distance
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve(true);
          }
        }, 50); // Decreased interval
      });
    });
  };

  // Home Page
  await page.goto('http://localhost:3001');
  await scrollDown();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'final_homepage.png', fullPage: true });

  // Properties Listings
  await page.goto('http://localhost:3001/properties');
  await scrollDown();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'final_listings.png', fullPage: true });

  // Single Property Detail
  await page.goto('http://localhost:3001/properties/1');
  await scrollDown();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'final_property_detail.png', fullPage: true });

  // About Page
  await page.goto('http://localhost:3001/about');
  await scrollDown();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'final_about.png', fullPage: true });

  // Contact Page
  await page.goto('http://localhost:3001/contact');
  await scrollDown();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'final_contact.png', fullPage: true });
});
