import { test, type Page } from '@playwright/test';

async function measureWithWheel(page: Page, url: string, headerSelector: string) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForSelector(headerSelector);

  await page.evaluate((sel) => {
    (window as any).__samples = [];
    const h = document.querySelector(sel) as HTMLElement;
    let stop = false;
    const tick = () => {
      if (stop) return;
      const r = h.getBoundingClientRect();
      (window as any).__samples.push({ y: r.top, h: r.height, sy: window.scrollY, t: performance.now() });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    (window as any).__stopSamples = () => { stop = true; };
  }, headerSelector);

  // Simulate trackpad-like rapid wheel events with deceleration
  await page.mouse.move(720, 450);
  for (let i = 0; i < 40; i++) {
    await page.mouse.wheel(0, 60 + Math.sin(i / 5) * 20);
    await page.waitForTimeout(16);
  }
  await page.waitForTimeout(500);

  const samples: Array<{ y: number; h: number; sy: number; t: number }> = await page.evaluate(() => {
    (window as any).__stopSamples?.();
    return (window as any).__samples;
  });

  const tops = samples.map((s) => s.y);
  const heights = samples.map((s) => s.h);
  const slipMagnitudes = samples.map((s) => Math.abs(s.y));
  return {
    sampleCount: samples.length,
    topRange: [Math.min(...tops), Math.max(...tops)],
    heightRange: [Math.min(...heights), Math.max(...heights)],
    maxSlip: Math.max(...slipMagnitudes),
    avgSlip: slipMagnitudes.reduce((a, b) => a + b, 0) / slipMagnitudes.length,
    slipFrames: samples.filter((s) => Math.abs(s.y) > 0.5).length,
  };
}

test('wheel-event compare: unbuzz vs curfee', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const unbuzz = await measureWithWheel(page, 'https://unbuzz-consulting.com', '.site-header');
  const curfee = await measureWithWheel(page, 'http://localhost:4322/', '[data-header]');

  console.log('UNBUZZ wheel:', JSON.stringify(unbuzz, null, 2));
  console.log('CURFEE wheel:', JSON.stringify(curfee, null, 2));

  await context.close();
});
