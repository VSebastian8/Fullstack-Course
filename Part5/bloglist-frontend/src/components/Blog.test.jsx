import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders only title and author by default', () => {
    const blog = {
      id: '69a457be851ef6488b1c5dd9',
      likes: 18,
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      user: {
        username: 'dijstrack',
        name: 'Edsger W. Dijkstra',
        id: '699ec6fad81ee539baa1419f'
      }
    }

    render(<Blog blog={blog} />)
    // Displays Title and Author
    screen.getByText('Go To Statement Considered Harmful - Edsger W. Dijkstra')
    // Doesn't display likes
    const likesElement = screen.queryByText('likes 18', { exact: false })
    expect(likesElement).toBeNull()
    // Doesn't display url
    const urlElement = screen.queryByText('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', { exact: false })
    expect(urlElement).toBeNull()
  })

  test('clicking view reveals likes and url', async () => {
    const blog = {
      id: '69a457be851ef6488b1c5dd9',
      likes: 18,
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      user: {
        username: 'dijstrack',
        name: 'Edsger W. Dijkstra',
        id: '699ec6fad81ee539baa1419f'
      }
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // Displays Title, Author, Likes and Url
    screen.getByText('Go To Statement Considered Harmful - Edsger W. Dijkstra')
    screen.getByText('likes 18', { exact: false })
    screen.getByText('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', { exact: false })
  })

  test('liking blog calls update props function', async () => {
    const blog = {
      id: '69a457be851ef6488b1c5dd9',
      likes: 18,
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      user: {
        username: 'dijstrack',
        name: 'Edsger W. Dijkstra',
        id: '699ec6fad81ee539baa1419f'
      }
    }
    const mockUpdateBlog = vi.fn()

    render(<Blog blog={blog} updateBlog={mockUpdateBlog} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    // 2 likes => 2 update calls
    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})
