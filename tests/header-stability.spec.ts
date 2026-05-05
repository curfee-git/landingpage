import { test, expect, devices, type Page, type BrowserContext } from '@playwright/test';

const URL = 'http://localhost:4322/';

type Sample = { y: number; height: number; scrollY: number };

async function sample(page: Page): Promise<Sample> {
  return page.evaluate(() => {
    const h = document.querySelector('[data-header]') as HTMLElement | null;
    if (!h) return { y: NaN, height: NaN, scrollY: window.scrollY };
    const r = h.getBoundingClientRect();
    return { y: r.top, height: r.height, scrollY: window.scrollY };
  });
}

async function runStabilityCheck(page: Page, label: string) {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-header]');

  const initial = await sample(page);
  expect(initial.y, `${label} initial top`).toBeCloseTo(0, 0);
  expect(initial.height, `${label} initial height`).toBeGreaterThanOrEqual(70);
  expect(initial.height, `${label} initial height`).toBeLessThanOrEqual(80);

  const heights: number[] = [];
  const tops: number[] = [];

  for (const dy of [200, 600, 1200, 2000]) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior }), dy);
    await page.waitForTimeout(150);
    const s = await sample(page);
    heights.push(s.height);
    tops.push(s.y);
    expect(s.y, `${label} top after scroll ${dy}`).toBeCloseTo(0, 0);
    expect(s.height, `${label} height after scroll ${dy}`).toBeCloseTo(initial.height, 0);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
  const back = await sample(page);
  expect(back.y, `${label} top after scroll back`).toBeCloseTo(0, 0);
  expect(back.height, `${label} height after scroll back`).toBeCloseTo(initial.height, 0);

  return { initial, heights, tops };
}

async function activeScrollSampling(page: Page, label: string) {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-header]');

  // Start collecting samples via rAF before scroll begins.
  await page.evaluate(() => {
    (window as any).__samples = [];
    const h = document.querySelector('[data-header]') as HTMLElement;
    let stop = false;
    const tick = () => {
      if (stop) return;
      const r = h.getBoundingClientRect();
      (window as any).__samples.push({ y: r.top, h: r.height, sy: window.scrollY, t: performance.now() });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    (window as any).__stopSamples = () => { stop = true; };
  });

  // Smooth scroll over ~1s to mimic a momentum scroll.
  await page.evaluate(async () => {
    const total = 2400;
    const duration = 1000;
    const start = performance.now();
    return new Promise<void>((res) => {
      const step = () => {
        const t = Math.min(1, (performance.now() - start) / duration);
        window.scrollTo(0, total * t);
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

  expect(samples.length, `${label} sample count`).toBeGreaterThan(20);

  const slipFrames = samples.filter((s) => Math.abs(s.y) > 1);
  const heightDrift = samples.filter((s) => s.h < 70 || s.h > 80);

  expect(slipFrames.length, `${label} slip frames (top !== 0): ${JSON.stringify(slipFrames.slice(0, 5))}`).toBe(0);
  expect(heightDrift.length, `${label} height drift frames: ${JSON.stringify(heightDrift.slice(0, 5))}`).toBe(0);
}

test.describe('Header stability', () => {
  test('Chromium desktop', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await runStabilityCheck(page, 'chromium-desktop');
    await context.close();
  });

  test('mobile viewport', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await runStabilityCheck(page, 'mobile-390x844');
    await context.close();
  });

  test('active scroll sampling (rAF)', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await activeScrollSampling(page, 'active-scroll-desktop');
    await context.close();
  });

  test('active scroll sampling mobile', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await activeScrollSampling(page, 'active-scroll-mobile');
    await context.close();
  });
});
