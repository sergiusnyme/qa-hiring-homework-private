import { test, expect } from '@playwright/test';

test.describe('Task creation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('tasks'));
    await page.reload();
  });

  test('adds a task with required fields and defaults', async ({ page }) => {
    // Enter a valid title and submit with optional fields left at their defaults.
    await page.getByPlaceholder('Task Title').fill('plan sprint');
    await page.getByRole('button', { name: 'Add Task' }).click();

    // Verify capitalization, defaults, and incomplete state.
    const card = page.locator('.task-item').filter({ hasText: 'Plan sprint' });
    await expect(card).toContainText('Importance: Medium');
    await expect(card).toContainText('Label: Work');
    await expect(card.getByRole('button', { name: 'Complete' })).toBeVisible();
  });
});
