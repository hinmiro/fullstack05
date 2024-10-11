import Blog from './Blog.jsx'

const BlogForm = ({ user, setUser, blogs, setBlogs }) => {
  const handleLogout = (evt) => {
    evt.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const updateBlog = (updatedBlog) => {
    const updatedBlogs = blogs
      .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      .sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
    const updatedUser = { ...user, blogs: updatedBlogs }
    setUser(updatedUser)
    window.localStorage.setItem('appUser', JSON.stringify(updatedUser))
  }

  const removeBlog = (id) => {
    const updatedBlogs = blogs
      .filter((blog) => blog.id !== id)
      .sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
    const updatedUser = { ...user, blogs: updatedBlogs }
    setUser(updatedUser)
    window.localStorage.setItem('appUser', JSON.stringify(updatedUser))
  }

  return (
    <>
      <p>
        {user.username} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <br />
      <br />
      <table
        id="blogsTableId"
        style={{ border: '1px solid black', borderCollapse: 'collapse' }}
      >
        <tbody>
          {(Array.isArray(blogs) ? blogs : []).map((blog) => (
            <tr key={blog.id} style={{ border: '1px solid black' }}>
              <td>
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateBlog}
                  removeBlog={removeBlog}
                  user={user}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default BlogForm
