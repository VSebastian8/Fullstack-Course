const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'James Bond',
        username: 'bestspy',
        password: 'code007'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()

  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('bestspy')
      await page.getByLabel('password').fill('code007')
      await page.getByRole('button', { name: 'login' }).click()

      const notifDiv = page.locator('.notification')
      await expect(notifDiv).toContainText('logged in successfully')
      await expect(notifDiv).toHaveCSS('border-style', 'solid')
      await expect(notifDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

      await expect(page.getByText('Blogs')).toBeVisible()
      await expect(page.getByText('James Bond logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('bestspy')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      const notifDiv = page.locator('.notification')
      await expect(notifDiv).toContainText('wrong username or password')
      await expect(notifDiv).toHaveCSS('border-style', 'solid')
      await expect(notifDiv).toHaveCSS('color', 'rgb(255, 0, 0)')


      await expect(page.getByText('Log in to application')).toBeVisible()
      await expect(page.getByText('Blogs')).not.toBeVisible()
      await expect(page.getByText('James Bond logged in')).not.toBeVisible()
    })
  })
})