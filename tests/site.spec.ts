import { expect, test } from "@playwright/test";
import { pages } from "./pages";

test("nicio cerere externă pe nicio pagină", async ({ page, baseURL }) => {
  const external: string[] = [];
  page.on("request", (r) => {
    const url = r.url();
    if (!url.startsWith(baseURL!) && !url.startsWith("data:")) external.push(url);
  });
  for (const path of [...pages, "/pagina-inexistenta/"]) {
    await page.goto(path);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForLoadState("networkidle");
  }
  expect(external).toEqual([]);
});

test("toate paginile au titlu, h1 unic și noindex", async ({ page }) => {
  for (const path of pages) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(200);
    await expect(page.locator("h1"), path).toHaveCount(1);
    await expect(page).toHaveTitle(/Zâmbet Mare/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  }
});

test("pagina 404 e prietenoasă și are status 404", async ({ page }) => {
  const res = await page.goto("/nu-exista/");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ups!");
  await expect(page.getByRole("link", { name: "Înapoi acasă" })).toBeVisible();
});

test("tastatura: linkul „Sari la conținut” duce la conținut", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Sari la conținut" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#continut$/);
});

test("telefon: bara „Sună acum” și meniul cu tastatura", async ({ page, isMobile }) => {
  test.skip(!isMobile, "doar pe telefon");
  await page.goto("/");
  const call = page.locator(".callbar").getByRole("link", { name: "Sună acum" });
  await expect(call).toBeVisible();
  await expect(call).toHaveAttribute("href", /^tel:\+40/);

  const toggle = page.getByRole("button", { name: "Meniu" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Echipa" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("desktop: bara „Sună acum” e ascunsă, meniul e vizibil", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "doar pe desktop");
  await page.goto("/");
  await expect(page.locator(".callbar")).toBeHidden();
  await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Prețuri" })).toBeVisible();
});

test.describe("mișcare redusă", () => {
  test.use({ reducedMotion: "reduce" });
  test("fără animații și conținut vizibil imediat", async ({ page }) => {
    await page.goto("/");
    const tooth = page.locator(".scene__tooth");
    expect(await tooth.evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
    const card = page.locator("[data-reveal]").last();
    expect(await card.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  });
});

test("cu animații: personajele plutesc și elementele apar la derulare", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  expect(await page.locator(".scene__tooth").evaluate((el) => getComputedStyle(el).animationName)).toBe("bob");
  const last = page.locator("[data-reveal]").last();
  await last.scrollIntoViewIfNeeded();
  await expect(last).toHaveClass(/is-visible/);
});

test("demonstrația de periaj pornește, se oprește și anunță pașii", async ({ page }) => {
  await page.goto("/pentru-copii/");
  const btn = page.getByRole("button", { name: "Pornește periajul" });
  await btn.click();
  await expect(page.getByRole("button", { name: "Pauză" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".demo__status")).toContainText("Sus, în stânga");
  await page.getByRole("button", { name: "Pauză" }).click();
  await expect(page.getByRole("button", { name: "Continuă" })).toBeVisible();
});

test("întrebările frecvente se filtrează", async ({ page }) => {
  await page.goto("/intrebari-frecvente/");
  await page.getByLabel("Caută o întrebare").fill("albire");
  await expect(page.locator(".faq__item")).toHaveCount(1);
  await page.locator(".faq__item summary").click();
  await expect(page.getByText("nu strică smalțul")).toBeVisible();
});

test("navigarea între pagini funcționează și marchează pagina curentă", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Meniu" }).click();
  await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Prețuri" }).click();
  await expect(page).toHaveURL(/\/preturi\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Prețuri");
  if (isMobile) await page.getByRole("button", { name: "Meniu" }).click();
  await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Prețuri" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});
