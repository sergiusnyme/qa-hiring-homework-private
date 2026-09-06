import { test, expect } from '@playwright/test';

test.describe('Regression: task mutations persist', () => {
  test('persists completion and deletion after reload', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('tasks'));
    await page.reload();

    // Create and complete a task.
    await page.getByPlaceholder('Task Title').fill('Persistent task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    const card = page.locator('.task-item').filter({ hasText: 'Persistent task' });
    await card.getByRole('button', { name: 'Complete' }).click();
    await page.reload();

    // Completion should survive reload.
    const reloaded = page.locator('.task-item').filter({ hasText: 'Persistent task' });
    await expect.soft(reloaded.getByRole('button', { name: 'Uncomplete' })).toBeVisible();

    // Deletion should also survive reload.
    await reloaded.getByRole('button', { name: 'Delete' }).click();
    await page.reload();
    await expect.soft(page.locator('.task-item').filter({ hasText: 'Persistent task' })).toHaveCount(0);
  });
});
