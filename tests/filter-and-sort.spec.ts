import { test, expect } from '@playwright/test';

test.describe('Task filtering and sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('tasks'));
    await page.reload();
  });

  test('filters tasks by label and sorts them by importance', async ({ page }) => {
    // Add tasks with distinct labels and importance values.
    for (const task of [
      ['High work', 'High', 'Work'],
      ['Low work', 'Low', 'Work'],
      ['Medium social', 'Medium', 'Social'],
    ]) {
      await page.getByPlaceholder('Task Title').fill(task[0]);
      await page.locator('form select').nth(0).selectOption(task[1]);
      await page.locator('form select').nth(1).selectOption(task[2]);
      await page.getByRole('button', { name: 'Add Task' }).click();
    }

    // Show only Work tasks.
    await page.locator('.filter-sort select').nth(0).selectOption('Work');
    await expect(page.locator('.task-item')).toHaveCount(2);
    await expect(page.getByText('Medium social')).toHaveCount(0);

    // Verify ascending order is Low, Medium, High.
    await page.locator('.filter-sort select').nth(1).selectOption('asc');
    await expect(page.locator('.task-item').nth(0)).toContainText('Low work');
    await expect(page.locator('.task-item').nth(1)).toContainText('High work');

    // Verify descending order is High, Medium, Low.
    await page.locator('.filter-sort select').nth(1).selectOption('desc');
    await expect(page.locator('.task-item').nth(0)).toContainText('High work');
    await expect(page.locator('.task-item').nth(1)).toContainText('Low work');
  });
});
