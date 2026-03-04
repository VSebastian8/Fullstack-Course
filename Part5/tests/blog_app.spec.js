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

      test('a blog can be deleted', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())
        const blog = page.getByText('Hmmm hmm hmmm').locator('..')
        // Expand blog to see remove button
        await blog.getByRole('button', { name: 'view' }).click()
        await blog.getByText('hide').waitFor()
        // Delete blog
        await blog.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('Hmmm hmm hmmm')).toBeHidden()
        expect(page.getByText('Hmmm hmm hmmm')).not.toBeVisible()
      })

      test('only owner can see remove button', async ({ page }) => {
        // Should see button for own blogs
        const detectiveBlog = page.getByText('Hues and clues').locator('..')
        await detectiveBlog.getByRole('button', { name: 'view' }).click()
        await detectiveBlog.getByText('hide').waitFor()
        await expect(detectiveBlog.getByText('remove')).toBeVisible()
        // Shouldn't see button for other blogs
        const spyBlog = page.getByText('best spy first blog').locator('..')
        await spyBlog.getByRole('button', { name: 'view' }).click()
        await spyBlog.getByText('hide').waitFor()
        await expect(spyBlog.getByText('remove')).not.toBeVisible()
      })

      test('blogs are sorted by the number of likes', async ({ page }) => {
        // Select the 3 blogs
        const detectiveBlog1 = page.getByText('Hmmm hmm hmmm').locator('..')
        const detectiveBlog2 = page.getByText('Hues and clues').locator('..')
        const spyBlog = page.getByText('best spy first blog').locator('..')
        // Like each blog a few times
        await likeBlog(spyBlog)
        await likeBlog(detectiveBlog1)
        await likeBlog(detectiveBlog2)
        await likeBlog(detectiveBlog1)
        await likeBlog(spyBlog)
        await likeBlog(spyBlog)
        await likeBlog(detectiveBlog2)
        await likeBlog(spyBlog)
        await likeBlog(detectiveBlog2)
        await likeBlog(spyBlog)
        await likeBlog(detectiveBlog2)
        await likeBlog(detectiveBlog2)
        await likeBlog(detectiveBlog2)
        // Check final like count
        await expect(spyBlog.getByText('likes 5')).toBeVisible()
        await expect(detectiveBlog1.getByText('likes 2')).toBeVisible()
        await expect(detectiveBlog2.getByText('likes 6')).toBeVisible()
        // Check correct order
        const blogs = await page.locator('.blog').all()
        await expect(blogs[0].getByText('Hues and Clue')).toBeVisible()
        await expect(blogs[1].getByText('best spy first blog')).toBeVisible()
        await expect(blogs[2].getByText('Hmmm hmm hmmm')).toBeVisible()
      })
    })
  })
})