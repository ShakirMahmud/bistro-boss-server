const express = require('express');
const {adminStats} = require('../controllers/adminStatsController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', adminStats);

module.exports = router;