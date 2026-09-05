import { argosScreenshot } from '@argos-ci/playwright';
import { test, expect } from '@playwright/test';

const importances = ['Low', 'Medium', 'High'] as const;
const labels = ['Work', 'Social', 'Home', 'Hobby'] as const;
const completionStates = [false, true] as const;

test.describe('Task property combinations', () => {
  test('renders and screenshots every importance, label, and completeness combination', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('tasks'));
    await page.reload();

    // Add and screenshot all 24 combinations required by the README.
    for (const importance of importances) {
      for (const label of labels) {
        for (const completed of completionStates) {
          const title = `${importance}-${label}-${completed ? 'complete' : 'incomplete'}`;
          await page.getByPlaceholder('Task Title').fill(title);
          await page.locator('form select').nth(0).selectOption(importance);
          await page.locator('form select').nth(1).selectOption(label);
          await page.getByRole('button', { name: 'Add Task' }).click();
          const card = page.locator('.task-item').filter({ hasText: title });
          if (completed) {
            await card.getByRole('button', { name: 'Complete' }).click();
          }
          await expect(card).toContainText(`Importance: ${importance}`);
          await expect(card).toContainText(`Label: ${label}`);
          await expect(card.getByRole('button', { name: completed ? 'Uncomplete' : 'Complete' })).toBeVisible();
          await argosScreenshot(page, `task-${importance.toLowerCase()}-${label.toLowerCase()}-${completed ? 'complete' : 'incomplete'}`);
        }
      }
    }
  });
});
