const { getDatabase } = require('../config/dbConnection');

const reviewsCollection = getDatabase().collection('reviews');
const getReviews = async (req, res) => {
  try {
    const result = await reviewsCollection.find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

module.exports = { getReviews };