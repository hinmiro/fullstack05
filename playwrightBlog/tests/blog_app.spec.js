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
    const userInput = page.locator('input[name="Username"]');
    const passInput = page.locator('input[name="Password"]');
    const loginButton = await page.getByRole("button", { name: "login" });

    await userInput.fill("mluukkai");
    await passInput.fill("salainen");
    await loginButton.click();
    await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
  });

  test("failed login", async ({ page }) => {
    const userInput = page.locator('input[name="Username"]');
    const passInput = page.locator('input[name="Password"]');
    const loginButton = await page.getByRole("button", { name: "login" });

    await userInput.fill("failed");
    await passInput.fill("attempt");
    await loginButton.click();
    await expect(page.getByText("Username or password is wrong")).toBeVisible();
  });
});
