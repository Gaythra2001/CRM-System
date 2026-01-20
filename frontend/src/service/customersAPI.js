import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/customers";

export const fetchCustomers = async (token) => {
  const res = await axios.get(baseURL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const fetchCustomer = async (token, id) => {
  const res = await axios.get(`${baseURL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const saveCustomer = async (token, payload) => {
  const res = await axios.post(baseURL, payload, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateCustomer = async (token, id, payload) => {
  const res = await axios.put(`${baseURL}/${id}`, payload, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteCustomer = async (token, id) => {
  const res = await axios.delete(`${baseURL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
