# Task Manager Bug Report

These findings are based on the current implementation and are represented by the regression tests in `tests/`. Re-run each scenario manually at `http://localhost:5173/` and attach screenshots or video before submission.

## BUG-001: Editing a task resets existing values

**Severity:** High

**Area:** Edit task

**Steps to reproduce:**

1. Add a task with description `Original description`, importance `High`, and label `Social`.
2. Click `Edit` on that task.
3. Observe the edit controls.
4. Change only the title and click `Save`.

**Expected:** Existing description, importance, label, and completion state remain unchanged unless explicitly edited.

**Actual:** The edit form initializes description as empty, importance as `Low`, and label as `Hobby`. Saving also sets completion to incomplete.

**Automation:** `tests/regression-edit-preserves-data.spec.ts`

## BUG-002: Task mutations are not persisted after reload

**Severity:** High

**Area:** Persistence

**Steps to reproduce:**

1. Add a task.
2. Mark it complete.
3. Reload the page.
4. Delete the task and reload again.

**Expected:** Completion and deletion remain persisted after reload.

**Actual:** Add writes to local storage, but complete, edit, and delete update only React state. Reload can restore stale task data.

**Automation:** `tests/regression-mutations-persist.spec.ts`

## BUG-003: Empty titles can be submitted

**Severity:** Medium

**Area:** Add task validation

**Steps to reproduce:**

1. Leave `Task Title` empty.
2. Click `Add Task`.
3. Repeat with a whitespace-only title.

**Expected:** Submission is blocked with a clear validation message and no task is created.

**Actual:** The button is only visually styled as unavailable. It remains clickable, and the submit handler does not validate or trim the title.

**Automation:** `tests/regression-rejects-empty-title.spec.ts`

## BUG-004: Importance sorting uses alphabetical order

**Severity:** Medium

**Area:** Filtering and sorting

**Steps to reproduce:**

1. Add a `High` Work task.
2. Add a `Low` Work task.
3. Select the Work label filter.
4. Select ascending importance sort.

**Expected:** Tasks appear in domain order: Low, Medium, High.

**Actual:** Tasks are sorted alphabetically by the labels, so High appears before Low and Medium.

**Automation:** `tests/filter-and-sort.spec.ts`

## Exploratory follow-up

Before final submission, manually check long text, keyboard navigation, focus visibility, mobile layout, duplicate titles, malformed local storage, and color contrast. Record any additional confirmed visual or UX issues here with screenshots and reproduction steps.
