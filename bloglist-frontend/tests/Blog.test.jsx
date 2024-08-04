import { render, screen } from '@testing-library/react'
import Blog from '/src/components/Blog.jsx'

test('blog to render title and author', () => {
  const blog = {
    title: 'Test blog',
    author: 'tester',
    likes: 0,
    url: 'asddsad',
    user: { id: '123' },
  }

  render(
    <Blog
      blog={blog}
      updateBlog={() => {}}
      removeBlog={() => {}}
      user={{ id: '123' }}
    />
  )

  expect(
    screen.getByText((content) => content.startsWith('tester'))
  ).toBeInTheDocument()
})
