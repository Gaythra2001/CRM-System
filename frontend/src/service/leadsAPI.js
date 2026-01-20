import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/leads";

export const fetchLeads = async (token) => {
  const res = await axios.get(baseURL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const saveLead = async (token, payload) => {
  const res = await axios.post(baseURL, payload, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateLead = async (token, id, payload) => {
  const res = await axios.put(`${baseURL}/${id}`, payload, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateLeadStatus = async (token, id, status) => {
  const res = await axios.put(
    `${baseURL}/${id}/status`,
    { status },
    { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const convertLead = async (token, id) => {
  const res = await axios.post(`${baseURL}/${id}/convert`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
