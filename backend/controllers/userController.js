const User = require("../models/User");
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const addUser = async (req, res) => {

  const { username, email, password,fullName, role } = req.body;
  if (!username || !email || !password || !role || !fullName) {
    return res.status(400).json({ message: "Please provide username, email, password and role" });
  }

  try {
    const existingUser = await User.findOne(username, email);
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser( username, email, hashedPassword,fullName, role );
    res.status(201).json({success:true, userId:newUser});
  } catch (error) {
    res.status(500).json({ message: "Error adding user" });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};


const updateUser = async (req, res) => {

  try {
    const updatedRows = await User.updateUser(req.params.id, req.body);
    if (updatedRows > 0) {
      res.json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found or no changes made" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteUser(req.params.id);
    if (result) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};


module.exports = { getAllUsers, addUser, getUserById, deleteUser, updateUser }; 