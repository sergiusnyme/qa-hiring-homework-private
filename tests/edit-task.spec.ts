import { test, expect } from '@playwright/test';

test.describe('Task editing', () => {
  test('edits an existing task without losing its data', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('tasks'));
    await page.reload();

    // Create a task with non-default values.
    await page.getByPlaceholder('Task Title').fill('Original title');
    await page.getByPlaceholder('Task Description').fill('Original description');
    await page.locator('form select').nth(0).selectOption('High');
    await page.locator('form select').nth(1).selectOption('Social');
    await page.getByRole('button', { name: 'Add Task' }).click();

    // Open edit mode and verify the editable title is loaded.
    const card = page.locator('.task-item').filter({
      has: page.getByRole('heading', { name: 'Original title' }),
    });
    const cardIndex = await card.evaluate((element) =>
      Array.from(document.querySelectorAll('.task-item')).indexOf(element),
    );
    await card.getByRole('button', { name: 'Edit' }).click();
    const editCard = page.locator('.task-item').nth(cardIndex);
    await expect(editCard.locator('input')).toHaveValue('Original title');

    // Change the title and save the edit.
    await editCard.locator('input').fill('Updated title');
    await editCard.getByRole('button', { name: 'Save' }).click();

    // Verify the edited title is displayed.
    const updated = page.locator('.task-item').filter({ hasText: 'Updated title' });
    await expect(updated).toBeVisible();
  });
});
