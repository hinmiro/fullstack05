import ShowButton from "./ShowButton.jsx";
import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
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
                Likes: {blog.likes ? blog.likes : 0}
                <button>like</button>
              </td>
            </tr>
            <tr>
              <td>URl: {blog.url}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Blog;
