import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { pages } from "./pages";

const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

test.use({ reducedMotion: "reduce" });

for (const path of [...pages, "/pagina-inexistenta/"]) {
  test(`axe fără probleme: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(tags).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
  });
}

test("axe: meniul deschis pe telefon și formularul cu erori", async ({ page, isMobile }) => {
  await page.goto("/programare/");
  if (isMobile) await page.getByRole("button", { name: "Meniu" }).click();
  await page.getByRole("button", { name: "Cere programarea" }).click();
  const results = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});

test("axe: întrebări fără rezultat și listă bifată complet", async ({ page }) => {
  await page.goto("/intrebari-frecvente/");
  await page.getByLabel("Caută o întrebare").fill("xyzxyz");
  await expect(page.getByRole("heading", { name: "Hopa, n-am găsit nimic" })).toBeVisible();
  let results = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);

  await page.goto("/pentru-copii/");
  for (const box of await page.getByRole("checkbox").all()) await box.check();
  await expect(page.getByText("Bravo! Dințișor e mândru de tine!")).toBeVisible();
  results = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
