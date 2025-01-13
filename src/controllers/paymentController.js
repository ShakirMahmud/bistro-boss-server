const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/dbConnection");
const cartsCollection = getDatabase().collection("carts");
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

const createPayment = async (req, res) => {
  try {
    const payment = req.body;
    const result = await paymentCollection.insertOne(payment);
    // delete each item from the cart
    const query = {_id: {$in: payment.cartItems.map(id => new ObjectId(id))}};
    const result2 = await cartsCollection.deleteMany(query);
    res.json({result, result2 });
  } catch (error) {
    res.status(500).json({ message: "Error creating payment", error });
  }
};

const getPayments = async (req, res) => {
  try {
    console.log(req.params);
    const query = { email: req.params.email };
    if(req.params.email !== req.decoded.email) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const result = await paymentCollection.find(query).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
};

module.exports = { createPaymentIntent, createPayment, getPayments };
