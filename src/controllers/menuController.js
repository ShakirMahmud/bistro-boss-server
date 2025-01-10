const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/dbConnection');
const menuCollection = getDatabase().collection('menu');
const getMenu = async (req, res) => {
  try {
    const result = await menuCollection.find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu", error: error.message });
  }
};

const getMenuById = async (req, res) => {
  try {
    const id = req.params.id;
    let query;
    if (ObjectId.isValid(id)) {
      query = { 
        $or: [
          { _id: new ObjectId(id) },   
          { _id: id }
        ]
      };
    } else {
      query = { _id: id };
    }
    const result = await menuCollection.findOne(query);

    if (!result) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu item", error: error.message });
  }
};

const postMenu = async (req, res) => {
  try {
    const data = req.body;
    const result = await menuCollection.insertOne(data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating menu item", error: error.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    const id = req.params.id;;
    const data = req.body;
    let query;
    if (ObjectId.isValid(id)) {
      query = { 
        $or: [
          { _id: new ObjectId(id) },   
          { _id: id }
        ]
      };
    } else {
      query = { _id: id };
    }
    const result = await menuCollection.updateOne(query, { $set: data });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating menu item", error: error.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;
    let query;
    if (ObjectId.isValid(id)) {
      query = { 
        $or: [
          { _id: new ObjectId(id) },   
          { _id: id }
        ]
      };
    } else {
      query = { _id: id };
    }
    const result = await menuCollection.deleteOne(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu item", error: error.message });
  }
};

module.exports = { getMenu, getMenuById, postMenu, deleteMenu, updateMenu };