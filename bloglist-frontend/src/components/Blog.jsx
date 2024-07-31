import ShowButton from "./ShowButton.jsx";
import { useState } from "react";
import LikeButton from "./LikeButton.jsx";
import blogService from "../services/blogs";
import DeleteButton from "./DeleteButton.jsx";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLikes = async () => {
    const updatedBlog = await blogService.addLike(blog);
    updateBlog(updatedBlog);
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(`Remove blog: ${blog.title}`);
    if (!confirmation) return;
    try {
      await blogService.deleteBlog(blog.id);
      removeBlog(blog.id);
    } catch (err) {
      console.log("Error occurred: ", err.message);
    }
  };

  return (
    <div
      style={{ border: "solid", borderWidth: 1, padding: 10, width: "10rem" }}
    >
      {blog.title}
      <ShowButton handleClick={handleShowDetails} text={"more"} />
      {showDetails && (
        <table>
          <tbody>
            <tr>
              <td>Title: {blog.title}</td>
            </tr>
            <tr>
              <td>Author: {blog.author}</td>
            </tr>
            <tr>
              <td>
                Likes: {blog.likes !== undefined ? blog.likes : 0}
                <LikeButton handleLikes={handleLikes}>like</LikeButton>
              </td>
            </tr>
            <tr>
              <td>URl: {blog.url}</td>
            </tr>
            <tr>
              <td>
                <DeleteButton handleDelete={handleDelete} text={"remove"} />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Blog;
