const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/dbConnection");
const cartsCollection = getDatabase().collection("carts");
const getCarts = async (req, res) => {
  try {
    const email = req.query.email;
    const result = await cartsCollection.find({ email: email }).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching carts",
      error: error.message,
    });
  }
};

const getCartById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const result = await cartsCollection.findOne(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cart item",
      error: error.message,
    });
  }
};

const postCarts = async (req, res) => {
  try {
    const cartItem = req.body;
    const result = await cartsCollection.insertOne(cartItem);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error adding cart item",
      error: error.message,
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await cartsCollection.deleteOne(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error deleting cart item",
      error: error.message,
    });
  }
};

module.exports = { getCarts, postCarts, getCartById, deleteCart };
