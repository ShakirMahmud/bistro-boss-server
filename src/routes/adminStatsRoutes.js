const express = require('express');
const {adminStats, orderStats} = require('../controllers/adminStatsController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, adminStats);
router.get('/orderStats', verifyToken, verifyAdmin,  orderStats);

module.exports = router;