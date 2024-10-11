import { test, expect } from "@playwright/test";

const { describe, beforeEach, afterAll } = test;

describe.serial("blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    /*await request.post("http://localhost:3003/api/users", {
                      data: {
                        username: "mluukkai",
                        name: "Matti Luukkainen",
                        password: "salainen",
                      },
                    });*/
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const usernameInput = await page.getByText("Username");
    const passwordInput = await page.getByLabel("Password");
    const loginButton = await page.getByRole("button", { name: "login" });
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  test("Login works", async ({ page }) => {
    const userInput = await page.locator("#usernameId");
    const passInput = await page.locator("#passwordId");
    const loginButton = await page.locator("#loginButtonId");

    await userInput.fill("mluukkai");
    await passInput.fill("salainen");
    await loginButton.click();
    await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
  });

  test("failed login", async ({ page }) => {
    const userInput = await page.locator("#usernameId");
    const passInput = await page.locator("#passwordId");
    const loginButton = await page.locator("#loginButtonId");

    await userInput.fill("failed");
    await passInput.fill("attempt");
    await loginButton.click();
    await expect(page.getByText("Username or password is wrong")).toBeVisible();
  });
});

// assignment 5.19
describe.serial("When logged in", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "mluukkai",
        name: "Matti Luukkainen",
        password: "salainen",
      },
    });
    await page.goto("http://localhost:5173");
    await page.locator("#usernameId").fill("mluukkai");
    await page.locator("#passwordId").fill("salainen");
    await page.locator("#loginButtonId").click();
  });

  test("a new blog can be created", async ({ page }) => {
    await page.getByRole("button", { name: "new blog" }).click();

    await page.locator("#titleInputId").fill("Something");
    await page.locator("#authorInputId").fill("TESTTESTTEST");
    await page.locator("#urlInputId").fill("test url");
    await page.locator("#submitBlogButton").click();

    await expect(page.getByText("TESTTESTTEST")).toBeVisible();
  });

  test("a blog can be liked", async ({ page }) => {
    await page.locator(".showMoreButton").nth(0).click();

    const likeCountText = await page.locator(".likeCount").nth(0).textContent();
    const likeCount = parseInt(likeCountText, 10);

    await page.locator(".likeButton").nth(0).click();

    const updateLikeCountText = await page
      .locator(".likeCount")
      .nth(0)
      .textContent();
    const updateLikeCount = parseInt(updateLikeCountText, 10);

    await expect(updateLikeCount).toBeGreaterThanOrEqual(likeCount);
  });

  test("for removing blog", async ({ page }) => {
    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await page
      .getByRole("row", { name: "TESTTESTTEST: Something more" })
      .getByRole("button")
      .click();

    const removeButton = page.getByRole("button", { name: "remove" });
    await removeButton.click();
    await page.waitForTimeout(1000);

    await expect(page.getByText("TESTTESTTEST")).not.toBeVisible();
  });

  test("to person who added blog is only one who can remove it", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");
    await page.locator("#usernameId").click();
    await page.locator("#usernameId").fill("mluukkai");
    await page.locator("#passwordId").click();
    await page.locator("#passwordId").fill("salainen");
    await page.getByRole("button", { name: "login" }).click();
    await page.getByRole("row").nth(0).getByRole("button").click();
    await expect(
      page.getByRole("button", { name: "remove" }),
    ).not.toBeVisible();
  });

  test("for blogs are ordered by likes", async ({ page }) => {
    await page.getByRole("button", { name: "new blog" }).click();

    await page.locator("#titleInputId").fill("kokeilu");
    await page.locator("#authorInputId").fill("kokeilija2");
    await page.locator("#urlInputId").fill("asdasd");
    await page.locator("#submitBlogButton").click();

    await page
      .getByRole("row", { name: "kokeilija2: kokeilu" })
      .getByRole("button")
      .click();
    await page.pause();
    await page.getByRole("button", { name: "like" }).click();
    await page.pause();
    await page.waitForSelector("#blogsTableId tr");

    const rows = await page.locator("#blogsTableId tr");
    await page.pause();
    const secondLastRow = rows.nth(-8);

    await expect(secondLastRow).toContainText("kokeilija2: kokeilu");
  });

  // Clean up for the created blog
  afterAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("http://localhost:5173");

    await page.goto("http://localhost:5173");
    await page.locator("#usernameId").click();
    await page.locator("#usernameId").fill("mluukkai");
    await page.locator("#passwordId").click();
    await page.locator("#passwordId").fill("salainen");
    await page.getByRole("button", { name: "login" }).click();

    await page.waitForSelector(`text=kokeilija2: kokeilu`);

    await page
      .getByRole("row", { name: "kokeilija2: kokeilu" })
      .getByRole("button")
      .click();

    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await page.waitForSelector("button", { name: "remove" });

    const removeButton = page.getByRole("button", { name: "remove" });
    await removeButton.click();

    await context.close();
  });
});
