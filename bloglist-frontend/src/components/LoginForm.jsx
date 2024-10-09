import loginService from '../services/login.js'
import { useState } from 'react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setUser, setMessage, setRed } = props

  const handleLogin = async (evt) => {
    evt.preventDefault()
    try {
      const newUser = await loginService.login({ username, password })
      window.localStorage.setItem('appUser', JSON.stringify(newUser))
      setUser(newUser)
      setUsername('')
      setPassword('')
      setMessage('Logged in')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      console.log(exception.message)
      setRed(true)
      setMessage('Username or password is wrong')
      setTimeout(() => {
        setMessage(null)
        setRed(false)
      }, 3000)
    }
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            id="usernameId"
            type="text"
            value={username}
            name="Username"
            style={{ marginLeft: '1rem' }}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            id="passwordId"
            type="password"
            value={password}
            name="Password"
            style={{ marginLeft: '1rem' }}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginButtonId" type="submit">
          login
        </button>
      </form>
    </>
  )
}

export default LoginForm
