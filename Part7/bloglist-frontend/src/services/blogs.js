import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.then((response) => response.data);
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.put(`${baseUrl}/comment/${id}`, { comment }, config);
  return request.then((response) => response.data);
};

export default { getAll, create, update, deleteBlog, addComment, setToken };
