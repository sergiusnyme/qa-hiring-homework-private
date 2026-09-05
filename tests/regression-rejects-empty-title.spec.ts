import { test, expect } from '@playwright/test';

test.describe('Regression: empty titles are rejected', () => {
  test('does not create a task when title is empty or whitespace', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('tasks'));
    await page.reload();

    // Submit with an empty title.
    await page.getByRole('button', { name: 'Add Task' }).click();
    await expect(page.locator('.task-item')).toHaveCount(0);

    // Submit with whitespace-only title.
    await page.getByPlaceholder('Task Title').fill('   ');
    await page.getByRole('button', { name: 'Add Task' }).click();

    // Expected failure until title validation is implemented.
    await expect(page.locator('.task-item')).toHaveCount(0);
  });
});
