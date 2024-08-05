import { useEffect, useState } from 'react'
import blogService from '../services/blogs.js'

const NewBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { handleBlogCreate, setUser } = props

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('appUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [setUser])

  const onSubmit = async (evt) => {
    evt.preventDefault()
    const newBlog = { title, author, url }
    await handleBlogCreate(newBlog)
  }

  return (
    <>
      <br />
      <br />
      <h3>Create new blog</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title:</label>
          <input
            aria-label={'Title:'}
            type={'text'}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            aria-label={'Author:'}
            type={'text'}
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>Url:</label>
          <input
            aria-label={'Url:'}
            type={'text'}
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type={'submit'}>Create</button>
      </form>
    </>
  )
}

export default NewBlogForm
