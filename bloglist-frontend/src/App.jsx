import { useState, useEffect } from "react";
import Notification from "./components/Notification.jsx";
import NewBlogForm from "./components/NewBlogForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import BlogForm from "./components/BlogForm.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [red, setRed] = useState(false);

  useEffect(() => {
    if (user && user.blogs) {
      const filteredBlogs = user.blogs.filter((blog) => blog != null);
      setBlogs(filteredBlogs);
    }
  }, [user]);

  return (
    <div>
      <h1>blogApp 1.0</h1>
      <Notification message={message} red={red} />
      <br />
      <br />
      {!user && (
        <LoginForm setUser={setUser} setMessage={setMessage} setRed={setRed} />
      )}
      {user && <BlogForm user={user} setUser={setUser} blogs={blogs} />}
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
