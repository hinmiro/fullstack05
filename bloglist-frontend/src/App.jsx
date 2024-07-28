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
    if (loggedUser) {
      const parseUser = JSON.parse(loggedUser);
      setUser(parseUser);
      const filteredBlogs = parseUser.blogs.filter((blog) => blog != null);
      setBlogs(filteredBlogs);
    } else {
      setUser(user);
      const filteredBlogs = user.blogs.filter((blog) => blog != null);
      setBlogs(filteredBlogs);
    }
  }, []);

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
    </div>
  );
};

export default App;
