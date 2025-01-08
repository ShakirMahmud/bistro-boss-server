const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/dbConnection");

const usersCollection = getDatabase().collection("users");
const getAllUsers = async (req, res) => {
  // console.log(req.headers);
  try {
    const result = await usersCollection.find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const getAdmins = async (req, res) => {
  try {
    const email = req.params.email;
    if (email !== req.decoded.email) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const query = { email: email };
    const result = await usersCollection.findOne(query);
    let isAdmin = false;
    if (result?.role === "admin") {
      isAdmin = true;
    }
    res.json({ isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
};

const postUsers = async (req, res) => {
  try {
    const user = req.body;
    // do not add user if it already exists
    const existingUser = await usersCollection.findOne({ email: user.email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const result = await usersCollection.insertOne(user);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await usersCollection.deleteOne(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// make a user as admin
const makeAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const update = { $set: { role: "admin" } };
    const result = await usersCollection.updateOne(query, update);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error making user admin", error });
  }
};

// change the role of a admin to user
const makeUser = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const update = { $set: { role: "user" } };
    const result = await usersCollection.updateOne(query, update);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error making user admin", error });
  }
};

module.exports = { getAllUsers, postUsers, deleteUser, makeAdmin, makeUser, getAdmins };
