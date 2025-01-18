import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import Blog from './Blog'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

describe('<Blog />', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5
  }

  beforeEach(() => {
    blogService.update.mockResolvedValue({
      ...blog,
      likes: blog.likes + 1
    })
  })

  test('renders title and author, but not URL or likes by default', () => {
    render(<Blog blog={blog} />)

    const titleElement = screen.getByText('Test Blog Test Author')
    expect(titleElement).toBeDefined()

    const urlElement = screen.queryByText('http://testurl.com')
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText('5')
    expect(likesElement).toBeNull()
  })

  test('renders URL and likes when the view button is clicked', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlElement = screen.getByText((content, element) => {
      return element.textContent.includes('http://testurl.com')
    })
    expect(urlElement).toBeDefined()

    const likesElement = screen.getByText('5')
    expect(likesElement).toBeDefined()
  })

  test('calls the event handler twice when the like button is clicked twice', async () => {
    const mockHandler = vi.fn()

    render(<Blog blog={blog} updateBlog={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})