const express = require('express');
const { getMenu, getMenuById, postMenu } = require('../controllers/menuController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getMenu);
router.get('/:id', getMenuById);
router.post('/',verifyToken, verifyAdmin, postMenu);

module.exports = router;