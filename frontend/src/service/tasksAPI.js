import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/tasks";

export const fetchTasks = async (token) => {
  const res = await axios.get(baseURL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const saveTask = async (token, payload) => {
  const res = await axios.post(baseURL, payload, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateTaskStatus = async (token, id, status) => {
  const res = await axios.put(
    `${baseURL}/${id}/status`,
    { status },
    { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const deleteTask = async (token, id) => {
  const res = await axios.delete(`${baseURL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
