const express = require('express');
const { createPaymentIntent } = require('../controllers/paymentController');

const router = express.Router();

router.post('/', createPaymentIntent);

module.exports = router;