import { test, expect } from '@playwright/test';

test.describe('Task state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('tasks'));
    await page.reload();
    await page.getByPlaceholder('Task Title').fill('Review release');
    await page.getByRole('button', { name: 'Add Task' }).click();
  });

  test('completes and uncompletes a task', async ({ page }) => {
    // Mark the task complete.
    const card = page.locator('.task-item').filter({ hasText: 'Review release' });
    await card.getByRole('button', { name: 'Complete' }).click();
    await expect(card.getByRole('button', { name: 'Uncomplete' })).toBeVisible();

    // Mark the task incomplete again.
    await card.getByRole('button', { name: 'Uncomplete' }).click();
    await expect(card.getByRole('button', { name: 'Complete' })).toBeVisible();
  });
});
