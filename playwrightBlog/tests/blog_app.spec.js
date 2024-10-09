import { test, expect } from "@playwright/test";

const { describe, beforeEach } = test;

describe("blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "mluukkai",
        name: "Matti Luukkainen",
        password: "salainen",
      },
    });
    await page.goto("http://localhost:5174");
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
describe("When logged in", () => {
  beforeEach(async ({ page }) => {
    // ...
  });

  test("a new blog can be created", async ({ page }) => {
    // ...
  });
});
