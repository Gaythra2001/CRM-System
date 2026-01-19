import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/users";

// get all users
export const fetchUsers = async (token) => {
  const res = await axios.get(baseURL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// get user by id
export const fetchUserById = async (token, userId) => {
  try {
    const res = await axios.get(`${baseURL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user by id:", error);
  }
};

// add  user
export const saveUser = async (token, userData) => {
  try {
    const res = await axios.post(baseURL, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

// update user
export const updateUser = async (token, userId, userData) => {
  console.log(token, userId, userData)
  try {
    const res = await axios.put(`${baseURL}/${userId}`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

// delete a user
export const deleteUser = async (token, userId) => {
  try {
    await axios.delete(`${baseURL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
