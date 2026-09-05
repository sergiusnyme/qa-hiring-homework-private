import { test } from '@playwright/test';

test('seed', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/');
});
