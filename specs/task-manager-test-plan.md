# Task Manager Test Plan

## Objective

Validate the task manager requirements from `README.md`: task creation, deletion, editing, completion state, label filtering, importance sorting, validation/defaults, persistence, usability, and visual behavior.

## User Stories

1. Add a task with required fields and verify capitalization, Medium importance, Work label, optional description, and incomplete-by-default state.
2. Add fully specified tasks and verify description, all importance values, all labels, and task isolation.
3. Complete and uncomplete a task and verify the action label, visual state, and neighboring tasks.
4. Edit a task, verify current values load, save changes, and cancel without mutation.
5. Delete one of two tasks and verify only the selected task is removed.
6. Filter by All, Work, Social, Home, and Hobby and verify only matching tasks are displayed.
7. Sort mixed tasks ascending and descending by importance, including while filtered.
8. Reload after add, edit, complete, and delete operations and verify task data persistence.

## Validation and Exploratory Checks

- Empty and whitespace-only titles must not create tasks.
- Title must start with a capital letter.
- Description and label are optional; title and importance are required.
- Check long content, mobile layout, keyboard navigation, focus visibility, contrast, duplicate titles, malformed local storage, and rapid repeated actions.
- Record confirmed functional and visual defects in the root `BUG_REPORT.md` with reproduction steps, expected result, actual result, severity, and evidence.

## Required Regression Tests

These tests intentionally have failing assertions against the current implementation. They are not marked with `test.fail()`, so Playwright reports the product defects as genuine failures:

- `tests/regression-edit-preserves-data.spec.ts`: editing preserves description, importance, label, and completion.
- `tests/regression-mutations-persist.spec.ts`: completion and deletion survive reload.
- `tests/regression-rejects-empty-title.spec.ts`: empty and whitespace-only titles are rejected.

## Visual Combination Test

`tests/task-combinations.visual.spec.ts` covers all `3 x 4 x 2 = 24` combinations of importance (`Low`, `Medium`, `High`), label (`Work`, `Social`, `Home`, `Hobby`), and completeness. Each combination asserts the card and submits an Argos screenshot.

## Automation and CI

- E2E project: all functional tests, excluding the visual matrix.
- Visual project: only the combination screenshot test.
- Both projects start the Vite app through Playwright `webServer`.
- `.github/workflows/e2e.yml` and `.github/workflows/visual.yml` run separately.
- Visual CI requires the `ARGOS_TOKEN` repository secret.
- CI enables the Argos Playwright reporter so visual screenshots are uploaded rather than only saved locally.
- Every run generates an HTML report in `playwright-report`; CI uploads it as a workflow artifact.
- Failed tests capture screenshots that are attached to the HTML report.

Local commands:

```bash
npm install
npm run lint
npm run build
./node_modules/.bin/playwright test --project=e2e
./node_modules/.bin/playwright test tests/regression-*.spec.ts --project=e2e
./node_modules/.bin/playwright test --project=visual
npm run test:report
```
