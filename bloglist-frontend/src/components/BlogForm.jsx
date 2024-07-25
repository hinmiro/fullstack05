import Blog from "./Blog.jsx";

const BlogForm = ({ user, setUser, blogs }) => {
  const handleLogout = (evt) => {
    evt.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };
  return (
    <>
      <p>
        {user.username} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogForm;
