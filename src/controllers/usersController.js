const { getDatabase } = require("../config/dbConnection");

const usersCollection = getDatabase().collection("users");
const getAllUsers = async (req, res) => {
  try {
    const result = await usersCollection.find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
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

module.exports = { getAllUsers, postUsers };
