const loginWith = async (page, username, password)  => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
  await page.locator('.notification').waitFor()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create blog' }).click()
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(title).waitFor()
}


const likeBlog = async (blog) => {
  // Expand blog if it's hidden
  if(await blog.getByText('view').isVisible())
    await blog.getByRole('button', { name: 'view' }).click()
  await blog.getByText('likes').waitFor()
  // Get current number of likes
  const blogContent = await blog.innerText()
  const previousLikes = Number(blogContent.match(/likes\s+(\d+)/)[1])
  await blog.getByRole('button', { name: 'like' }).click()
  // Wait for number to increase by 1
  await blog.getByText(`likes ${previousLikes + 1}`).waitFor()

}

module.exports = { loginWith, createBlog, likeBlog }