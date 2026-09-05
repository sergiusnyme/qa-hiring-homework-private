# Manual Bug Evidence

Store manually captured screenshots and videos in this folder before submitting the PR.

Recommended files:

- `BUG-001-edit-description.png`
- `BUG-001-edit-description.webm`
- `BUG-002-persistence.png`
- `BUG-002-persistence.webm`
- `BUG-003-empty-title.png`
- `BUG-003-empty-title.webm`
- `BUG-004-sorting.png`
- `BUG-004-sorting.webm`

Capture the evidence at `http://127.0.0.1:5173/` using a clean browser state. Each screenshot should show the incorrect result, and each video should show the reproduction steps from the corresponding bug report.

Do not place Playwright `test-results`, `playwright-report`, or generated visual snapshots here. Those are automated artifacts, not manual evidence.

await argosScreenshot(page, '...');
