import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification.jsx";
import NewBlogForm from "./components/NewBlogForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Toggleable from "./components/Toggleable.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [red, setRed] = useState(false);
  const toggleableFromRef = useRef();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("appUser");
    const parseUser = JSON.parse(loggedUser);
    if (parseUser === null) {
      return;
    }
    setUser(parseUser);
    const filteredBlogs = parseUser.blogs.filter((blog) => blog != null);
    const sortedBlogs = [...filteredBlogs].sort((a, b) => b.likes - a.likes);
    sortedBlogs.map((blog) => console.log(blog.likes));
    setBlogs(sortedBlogs);
  }, []);

  return (
    <div>
      <Notification message={message} red={red} />
      <h1>blogApp 1.0</h1>
      {user && (
        <BlogForm
          user={user}
          setUser={setUser}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      )}
      <br />
      <br />
      {user && (
        <Toggleable buttonLabel={"new blog"} ref={toggleableFromRef}>
          <NewBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            setUser={setUser}
            setMessage={setMessage}
            setRed={setRed}
            toggleVisibility={() =>
              toggleableFromRef.current.toggleVisibility()
            }
          />
        </Toggleable>
      )}

      {!user && (
        <LoginForm setUser={setUser} setMessage={setMessage} setRed={setRed} />
      )}
    </div>
  );
};

export default App;
