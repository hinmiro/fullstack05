import { useEffect, useState } from "react";
import blogService from "../services/blogs.js";

const NewBlogForm = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const { blogs, setBlogs, user, setUser, setMessage, setRed } = props;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("appUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

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

  return (
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
};

export default NewBlogForm;
