const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectToDatabase } = require("./src/config/dbConnection");
const menuRoutes = require("./src/routes/menuRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const usersRoute = require("./src/routes/usersRoute");
const cartsRoutes = require("./src/routes/cartsRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection and server start
async function startServer() {
  try {
    await connectToDatabase();

    // Routes
    app.use("/menu", menuRoutes);
    app.use("/reviews", reviewRoutes);
    app.use("/users", usersRoute);
    app.use("/carts", cartsRoutes);
    app.use("/jwt", authRoutes);

    // Basic route
    app.get("/", (req, res) => {
      res.send("Bistro Boss Server is running!");
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
}

startServer();
