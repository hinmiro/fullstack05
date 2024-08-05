import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from '../src/components/NewBlogForm.jsx'

const newBlog = {
  title: 'TEST',
  author: 'tester',
  url: 'ttt.test.te',
}

test('new blog create to call eventhandler from props', async () => {
  const mockHandler = vi.fn()
  const mockSetMessage = vi.fn()
  const mockSetRed = vi.fn()
  const mockSetBlogs = vi.fn()
  const mockSetUser = vi.fn()
  const mockToggleVisibility = vi.fn()
  const user = userEvent.setup()

  render(<NewBlogForm handleBlogCreate={mockHandler} setUser={mockSetUser} />)

  const inputTitle = screen.getByLabelText('Title:')
  const inputAuthor = screen.getByLabelText('Author:')
  const inputUrl = screen.getByLabelText('Url:')
  const newButton = screen.getByText((content) => content.includes('new blog'))
  const submitButton = screen.getByText('Create')

  await user.click(newButton)
  await user.type(inputTitle, newBlog.title)
  await user.type(inputAuthor, newBlog.author)
  await user.type(inputUrl, newBlog.url)
  await user.click(submitButton)
  console.log(inputUrl.value)

  expect(mockHandler).toHaveBeenCalledWith(newBlog)
})
