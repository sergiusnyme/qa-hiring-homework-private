import { test } from '@playwright/test';

test('browser seed', async ({ page }) => {
  await page.goto('http://localhost:5173/');
});
