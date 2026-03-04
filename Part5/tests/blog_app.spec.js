const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'James Bond',
        username: 'bestspy',
        password: 'code007'
      }
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()

  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'bestspy', 'code007')

      const notifDiv = page.locator('.notification')
      await expect(notifDiv).toContainText('logged in successfully')
      await expect(notifDiv).toHaveCSS('border-style', 'solid')
      await expect(notifDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

      await expect(page.getByText('Blogs')).toBeVisible()
      await expect(page.getByText('James Bond logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'bestspy', 'wrong')

      const notifDiv = page.locator('.notification')
      await expect(notifDiv).toContainText('wrong username or password')
      await expect(notifDiv).toHaveCSS('border-style', 'solid')
      await expect(notifDiv).toHaveCSS('color', 'rgb(255, 0, 0)')


      await expect(page.getByText('Log in to application')).toBeVisible()
      await expect(page.getByText('Blogs')).not.toBeVisible()
      await expect(page.getByText('James Bond logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'bestspy', 'code007')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'best spy first blog', 'James Bond', 'some/spy/url.com')

      await expect(page.getByText('best spy first blog')).toBeVisible()
    })

    describe('When multiple blogs exist', () => {
      beforeEach(async ({ page, request }) => {
        await createBlog(page, 'best spy first blog', 'James Bond', 'some/spy/url.com')
        await page.getByRole('button', { name: 'logout' }).click()
        await request.post('/api/users', {
          data: {
            name: 'Sherlock Holmes',
            username: 'bestdetective',
            password: 'investigate'
          }
        })
        await loginWith(page, 'bestdetective', 'investigate')
        await createBlog(page, 'Hmmm hmm hmmm', 'Sherlock Holmes', 'some/other/url.org')
        await createBlog(page, 'Hues and clues', 'Sherlock Holmes', 'some/other/other/url.org')
      })

      test('a blog can be liked', async ({ page }) => {
        const spyBlog = page.getByText('best spy first blog').locator('..')
        await likeBlog(spyBlog)

        await expect(spyBlog.getByText('likes')).toBeVisible()
        await expect(spyBlog.getByText('likes 1')).toBeVisible()
        await likeBlog(spyBlog)
        await likeBlog(spyBlog)
        await expect(spyBlog.getByText('likes 3')).toBeVisible()
      })
    })
  })
})