import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getBlogById = async (id) => {
  const req = await axios.get(baseUrl + `/${id}`);
  return req.data;
};

const getUserBlogs = async (token) => {
  const req = await axios.get(baseUrl);
  return req.data;
};

export default { getAll, getUserBlogs, getBlogById, setToken };
