import { expect, test } from "@playwright/test";

test.describe("formularul de programare", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/programare/");
  });

  test("trimis gol: arată erorile și mută focusul pe primul câmp", async ({ page }) => {
    await page.getByRole("button", { name: "Cere programarea" }).click();
    await expect(page.getByText("Scrie-ne numele tău.")).toBeVisible();
    await expect(page.getByText("Avem nevoie de un număr de telefon")).toBeVisible();
    await expect(page.getByText("Alege un serviciu")).toBeVisible();
    await expect(page.getByText("Alege ziua care ți se potrivește.")).toBeVisible();
    await expect(page.getByText("Bifează acordul")).toBeVisible();
    const name = page.getByLabel("Nume și prenume");
    await expect(name).toBeFocused();
    await expect(name).toHaveAttribute("aria-invalid", "true");
  });

  test("telefon greșit: mesaj clar, iar eroarea dispare la corectare", async ({ page }) => {
    await page.getByLabel("Nume și prenume").fill("Maria Ionescu");
    await page.getByLabel("Telefon").fill("12345");
    await page.getByRole("button", { name: "Cere programarea" }).click();
    await expect(page.getByText("Numărul nu pare corect")).toBeVisible();
    await expect(page.getByLabel("Telefon")).toBeFocused();
    await page.getByLabel("Telefon").fill("0722 123 456");
    await expect(page.getByText("Numărul nu pare corect")).toHaveCount(0);
  });

  test("completat corect: stare de succes sinceră, fără să trimită date", async ({ page }) => {
    // Nicio cerere nu are voie să conțină datele introduse.
    const leaks: string[] = [];
    page.on("request", (r) => {
      const payload = `${r.url()} ${r.postData() ?? ""}`;
      if (/Ionescu|0722|722123456/.test(decodeURIComponent(payload))) leaks.push(r.url());
    });
    await page.getByLabel("Nume și prenume").fill("Maria Ionescu");
    await page.getByLabel("Telefon").fill("0722 123 456");
    await page.getByLabel("Serviciu").selectOption({ label: "Igienizare" });
    await page.getByLabel("Ziua preferată").selectOption("Marți");
    await page.getByLabel(/Sunt de acord/).check();
    await page.getByRole("button", { name: "Cere programarea" }).click();

    const heading = page.getByRole("heading", { name: "Cererea ta e pregătită" });
    await expect(heading).toBeVisible();
    await expect(heading).toBeFocused();
    await expect(page.getByText("datele tale nu au fost trimise nicăieri")).toBeVisible();
    const mail = page.getByRole("link", { name: "Trimite pe email" });
    const href = decodeURIComponent((await mail.getAttribute("href")) ?? "");
    expect(href).toMatch(/^mailto:/);
    expect(href).toContain("Maria Ionescu");
    expect(href).toContain("0722123456");
    expect(href).toContain("Igienizare");
    expect(href).toContain("Marți");
    await expect(page.getByRole("status").getByRole("link", { name: /0236/ })).toHaveAttribute("href", /^tel:/);
    expect(leaks).toEqual([]);
  });

  test("serviciul se precompletează din link", async ({ page }) => {
    await page.goto("/programare/?serviciu=albire");
    await expect(page.getByLabel("Serviciu")).toHaveValue("albire");
  });

  test("link de programare din pagina unui serviciu", async ({ page }) => {
    await page.goto("/servicii/ortodontie/");
    await page.getByRole("link", { name: "Programează-te", exact: true }).last().click();
    await expect(page).toHaveURL(/\/programare\/\?serviciu=ortodontie/);
    await expect(page.getByLabel("Serviciu")).toHaveValue("ortodontie");
  });
});
