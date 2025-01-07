const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = async (req, res) => {
    try {
        const user = req.body;
        const token = jwt.sign(user , process.env.JWT_SECRET, { expiresIn:process.env.JWT_EXPIRES_IN });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error creating token", error });
    }
}

module.exports = { createToken };
