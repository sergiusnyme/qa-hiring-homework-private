import { test, expect } from '@playwright/test';

test.describe('Regression: edit preserves task data', () => {
  test('preserves description, importance, label, and completion state', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('tasks'));
    await page.reload();

    // Create a completed task with all fields populated.
    await page.getByPlaceholder('Task Title').fill('Original task');
    await page.getByPlaceholder('Task Description').fill('Keep this description');
    await page.locator('form select').nth(0).selectOption('High');
    await page.locator('form select').nth(1).selectOption('Social');
    await page.getByRole('button', { name: 'Add Task' }).click();
    const card = page.locator('.task-item').filter({
      has: page.getByRole('heading', { name: 'Original task' }),
    });
    const cardIndex = await card.evaluate((element) =>
      Array.from(document.querySelectorAll('.task-item')).indexOf(element),
    );
    await card.getByRole('button', { name: 'Complete' }).click();
    await card.getByRole('button', { name: 'Edit' }).click();
    const editCard = page.locator('.task-item').nth(cardIndex);

    // The title is loaded correctly; the next assertion should fail because the description is missing.
    await expect(editCard.locator('input')).toHaveValue('Original task');
    await expect(editCard.locator('textarea')).toHaveValue('Keep this description');

    // Change only the title and save.
    await editCard.locator('input').fill('Renamed task');
    await editCard.getByRole('button', { name: 'Save' }).click();

    // This intentionally fails until edit state preserves existing task data.
    const updated = page.locator('.task-item').filter({
      has: page.getByRole('heading', { name: 'Renamed task' }),
    });
    await expect(updated).toContainText('Keep this description');
    await expect(updated).toContainText('Importance: High');
    await expect(updated).toContainText('Label: Social');
    await expect(updated.getByRole('button', { name: 'Uncomplete' })).toBeVisible();
  });
});
