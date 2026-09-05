import { test, expect } from '@playwright/test';

test.describe('Task deletion', () => {
  test('deletes only the selected task', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('tasks'));
    await page.reload();

    // Add two independent tasks.
    await page.getByPlaceholder('Task Title').fill('Keep this task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await page.getByPlaceholder('Task Title').fill('Remove this task');
    await page.getByRole('button', { name: 'Add Task' }).click();

    // Delete the selected task.
    await page.locator('.task-item').filter({ hasText: 'Remove this task' }).getByRole('button', { name: 'Delete' }).click();

    // Verify the other task remains.
    await expect(page.locator('.task-item').filter({ hasText: 'Remove this task' })).toHaveCount(0);
    await expect(page.locator('.task-item').filter({ hasText: 'Keep this task' })).toBeVisible();
  });
});
