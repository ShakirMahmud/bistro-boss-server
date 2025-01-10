const express = require('express');
const { getMenu, getMenuById, postMenu, deleteMenu, updateMenu } = require('../controllers/menuController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getMenu);
router.get('/:id', getMenuById);
router.post('/',verifyToken, verifyAdmin, postMenu);
router.delete('/:id', verifyToken, verifyAdmin, deleteMenu);
router.patch('/:id', verifyToken, verifyAdmin, updateMenu);

module.exports = router;