import ShowButton from './ShowButton.jsx'
import { useState } from 'react'
import LikeButton from './LikeButton.jsx'
import blogService from '../services/blogs'
import DeleteButton from './DeleteButton.jsx'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLikes = async () => {
    try {
      const updatedBlog = await blogService.addLike(blog)
      updatedBlog.user = blog.user
      updateBlog(updatedBlog)
    } catch (err) {
      console.log('Error: ', err.message)
    }
  }

  const handleDelete = async () => {
    const confirmation = window.confirm(`Remove blog: ${blog.title}`)
    if (!confirmation) return
    try {
      await blogService.deleteBlog(blog.id)
      removeBlog(blog.id)
    } catch (err) {
      console.log('Error occurred: ', err.message)
    }
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td className={'blogAuthor'}>{`${blog.author}: `}</td>
            <td className={'blogTitle'}>{`${blog.title}`}</td>
            <td>
              <ShowButton handleClick={handleShowDetails} text={'more'} />
            </td>
          </tr>
        </tbody>
      </table>
      {showDetails && (
        <table>
          <tbody>
            <tr>
              <td>Title: {blog.title}</td>
            </tr>
            <tr>
              <td>Author: {blog.author}</td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ display: 'flex' }}>Likes:</p>
                  <p style={{ marginRight: '1rem' }} className="likeCount">
                    {blog.likes !== undefined ? blog.likes : 0}
                  </p>
                  <LikeButton handleLikes={handleLikes}>like</LikeButton>
                </div>
              </td>
            </tr>
            <tr>
              <td>URl: {blog.url}</td>
            </tr>
            {blog.user.id ===
              JSON.parse(window.localStorage.getItem('appUser')).id && (
              <tr>
                <td>
                  <DeleteButton handleDelete={handleDelete} text={'remove'} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Blog
