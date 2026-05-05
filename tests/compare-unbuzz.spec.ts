import { test, expect, type Page } from '@playwright/test';

async function measureSlip(page: Page, url: string, headerSelector: string) {
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

  await page.evaluate(async () => {
    const total = 2000;
    const duration = 1500;
    const start = performance.now();
    return new Promise<void>((res) => {
      const step = () => {
        const t = Math.min(1, (performance.now() - start) / duration);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        window.scrollTo(0, total * eased);
        if (t < 1) requestAnimationFrame(step);
        else res();
      };
      requestAnimationFrame(step);
    });
  });
  await page.waitForTimeout(200);

  const samples: Array<{ y: number; h: number; sy: number; t: number }> = await page.evaluate(() => {
    (window as any).__stopSamples?.();
    return (window as any).__samples;
  });

  const tops = samples.map((s) => s.y);
  const heights = samples.map((s) => s.h);
  const minTop = Math.min(...tops);
  const maxTop = Math.max(...tops);
  const minH = Math.min(...heights);
  const maxH = Math.max(...heights);
  const slipFrames = samples.filter((s) => Math.abs(s.y) > 0.5);

  return {
    sampleCount: samples.length,
    topRange: [minTop, maxTop],
    heightRange: [minH, maxH],
    slipFrames: slipFrames.length,
    slipFramePct: (slipFrames.length / samples.length) * 100,
  };
}

test('compare slip: unbuzz vs curfee', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const unbuzz = await measureSlip(page, 'https://unbuzz-consulting.com', '.site-header');
  const curfee = await measureSlip(page, 'http://localhost:4322/', '[data-header]');

  console.log('UNBUZZ:', JSON.stringify(unbuzz, null, 2));
  console.log('CURFEE:', JSON.stringify(curfee, null, 2));

  await context.close();
});
