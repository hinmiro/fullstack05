import Blog from "./Blog.jsx";

const BlogForm = ({ user, setUser, blogs, setBlogs }) => {
  const handleLogout = (evt) => {
    evt.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  const updateBlog = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
    );
  };

  return (
    <>
      <p>
        {user.username} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <br />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      ))}
    </>
  );
};

export default BlogForm;
