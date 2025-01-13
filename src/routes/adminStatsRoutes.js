const express = require('express');
const {adminStats, orderStats} = require('../controllers/adminStatsController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', adminStats);
router.get('/orderStats',  orderStats);

module.exports = router;