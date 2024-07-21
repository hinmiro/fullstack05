import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [red, setRed] = useState(false);

  useEffect(() => {
    if (user && user.blogs) {
      const filteredBlogs = user.blogs.filter((blog) => blog != null);
      setBlogs(filteredBlogs);
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("appUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

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

  const handleBlogCreate = async (evt) => {
    evt.preventDefault();
    try {
      const newBlog = { title: title, author: author, url: url };
      const createdBlog = await blogService.createNewBlog(newBlog);
      const newBlogs = blogs.concat(createdBlog);
      const updatedUser = { ...user, blogs: newBlogs };
      setBlogs(newBlogs);
      setUser(updatedUser);
      window.localStorage.setItem("appUser", JSON.stringify(updatedUser));
      setTitle("");
      setAuthor("");
      setUrl("");
      setMessage(`New blog created, ${newBlog.title}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (err) {
      setMessage("Error occurred making a new blog");
      setRed(true);
      setTimeout(() => {
        setMessage(null);
        setRed(false);
      }, 3000);
    }
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

  const newBlogForm = () => (
    <>
      <h3>Create new blog</h3>
      <form onSubmit={handleBlogCreate}>
        <div>
          Title:
          <input
            type={"text"}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type={"text"}
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type={"text"}
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type={"submit"}>Create</button>
      </form>
    </>
  );

  return (
    <div>
      <h1>blogApp 1.0</h1>
      <Notification message={message} red={red} />
      <br />
      <br />
      {!user && loginForm()}
      {user && blogForm()}
      {user && newBlogForm()}
    </div>
  );
};

export default App;
