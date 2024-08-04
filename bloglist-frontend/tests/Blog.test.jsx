import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '/src/components/Blog.jsx'

const blog = {
  id: '123asd',
  title: 'Test blog',
  author: 'tester',
  likes: 1,
  url: 'asddsad',
  user: { id: '123' },
}

beforeEach(() => {
  const localStorageMock = (function () {
    let store = {}
    return {
      getItem(key) {
        return store[key] || null
      },
      setItem(key, value) {
        store[key] = value.toString()
      },
      clear() {
        store = {}
      },
      removeItem(key) {
        delete store[key]
      },
    }
  })()
  Object.defineProperty(window, 'localStorage', { value: localStorageMock })

  window.localStorage.setItem(
    'appUser',
    JSON.stringify({ id: '123', username: 'tester', blogs: ['123asd'] })
  )
})

test('blog to render title and author', () => {
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

test('blog to render url, likes, etc. after clicking more', async () => {
  render(
    <Blog
      blog={blog}
      updateBlog={() => {}}
      removeBlog={() => {}}
      user={{ id: '123' }}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('more')
  await user.click(button)

  screen.debug()

  expect(screen.getByText('Title: Test blog')).toBeInTheDocument()
  expect(screen.getByText('Author: tester')).toBeInTheDocument()

  expect(
    screen.getByText((content) => content.includes('Likes: 1'))
  ).toBeInTheDocument()
  expect(screen.getByText('URl: asddsad')).toBeInTheDocument()
})
