
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
    const query = { _id: id};
    const result = await menuCollection.findOne(query);

    if (!result) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu item", error: error.message });
  }
};

module.exports = { getMenu, getMenuById };