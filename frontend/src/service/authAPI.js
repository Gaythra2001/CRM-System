import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/auth";

//login
export const SignIn = async (username, password) => {
  try {
    const res = await axios.post(`${baseURL}/login`, { username, password });
    return res.data;
  } catch (error) {
    throw error;
  }
};

//forgot password
export const ForgotPassword = async (email) => {
  try {
    const res = await axios.post(`${baseURL}/forgot-password`, { email });
    return res.data;
  } catch (error) {
    throw error;
  }
};

//reset password
export const resetPassword = async (token, password) => {
  try {
    const res = await axios.put(`${baseURL}/reset-password`, {token, newPassword :password});
    return res.data;
  } catch (error) {
    throw error;
  }
};