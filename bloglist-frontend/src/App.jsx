import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import Notification from "./components/Notification.jsx";
import NewBlogForm from "./components/NewBlogForm.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [red, setRed] = useState(false);

  useEffect(() => {
    if (user && user.blogs) {
      const filteredBlogs = user.blogs.filter((blog) => blog != null);
      setBlogs(filteredBlogs);
    }
  }, [user]);

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await loginService.login({ username, password });
      window.localStorage.setItem("appUser", JSON.stringify(newUser));
      setUser(newUser);
      setUsername("");
      setPassword("");
      setMessage("Logged in");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (exception) {
      console.log(exception.message);
      setRed(true);
      setMessage("Username or password is wrong");
      setTimeout(() => {
        setMessage(null);
        setRed(false);
      }, 3000);
    }
  };

  const handleLogout = (evt) => {
    evt.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="Username"
            style={{ marginLeft: "1rem" }}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="Password"
            style={{ marginLeft: "1rem" }}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  const blogForm = () => {
    return (
      <div>
        <p>
          {user.username} logged in{" "}
          <button onClick={handleLogout}>Logout</button>
        </p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>blogApp 1.0</h1>
      <Notification message={message} red={red} />
      <br />
      <br />
      {!user && loginForm()}
      {user && blogForm()}
      {user && (
        <NewBlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setUser={setUser}
          setMessage={setMessage}
          setRed={setRed}
        />
      )}
    </div>
  );
};

export default App;
