const { getDatabase } = require("../config/dbConnection");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paymentCollection = getDatabase().collection("payment");

const createPaymentIntent = async (req, res) => {
  try {
    const { price } = req.body;
    const amount = parseInt(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating payment intent", error: error.message });
  }
};

module.exports = { createPaymentIntent };
