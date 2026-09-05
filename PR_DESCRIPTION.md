# QA Homework Submission

## Coverage

- Test plan covers the required task manager user stories and exploratory checks.
- Playwright e2e tests cover adding, completing, editing, deleting, filtering, and sorting.
- Three functional regression tests intentionally fail as genuine red tests because the current application still contains the documented defects.
- The filtering/sorting test also documents the current alphabetical importance-order defect.
- The visual test generates all 24 importance/label/completeness combinations and submits Argos screenshots.
- Separate e2e and visual GitHub Actions workflows are included.
- Both local and CI runs generate an HTML Playwright report; CI uploads it as an artifact.
- Failed tests automatically attach screenshots to the HTML report.

## AI-assisted workflow

The Playwright test generator was used to draft scenarios and locators. Each generated test was reviewed against the README requirements and the application source. Regression tests remain genuine failures so automated healing cannot conceal known product bugs.

## Validation

The seed test was verified locally with:

```bash
./node_modules/.bin/playwright test
```

Full checks:

```bash
npm install
npm run lint
npm run build
npm run test:e2e
npm run test:regressions
npm run test:visual
npm run test:report
```

Before opening the PR, manually reproduce the listed defects and attach evidence to `BUG_REPORT.md`. Configure the `ARGOS_TOKEN` repository secret for the visual workflow.
