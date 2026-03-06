import { test, expect } from "@playwright/test";

const MOCK_TIP = "Stay tight on the hairpins and use your mushroom on the long straight out of sector 2. Mario's balanced stats shine here — trust your speed and keep wheel-to-wheel pressure on exits.";

test("selects a character and course, then shows the AI coach tip", async ({ page }) => {
  // Mock the coach API so the test is deterministic and doesn't need a real API key
  await page.route("/api/coach", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ tip: MOCK_TIP, source: "mock" }),
    });
  });

  await page.goto("/");

  // ── 1. Select a character (desktop layout > 900px viewport) ──────────────
  // Characters are rendered as buttons; click the first "Mario" button visible
  await page.getByRole("button", { name: /Mario/ }).first().click();

  // ── 2. Expand the Mushroom Cup and select Crown City ─────────────────────
  await page.getByRole("button", { name: /Mushroom Cup/ }).first().click();
  await page.getByRole("button", { name: /Crown City/ }).first().click();

  // ── 3. Coach tip should appear ────────────────────────────────────────────
  // Wait for loading state to clear and the mocked tip to render
  const tip = page.getByText(MOCK_TIP);
  await expect(tip).toBeVisible({ timeout: 10_000 });
});
