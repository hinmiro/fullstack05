import axios from 'axios'
import blogService from './blogs.js'

const baseUrl = '/api/login'

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials)
  const blogPromises = res.data.blogs.map((blogId) =>
    blogService.getBlogById(blogId.toString())
  )

  res.data.blogs = await Promise.all(blogPromises)
  return res.data
}

export default { login }
