const express = require('express');
const { getMenu, getMenuById } = require('../controllers/menuController');

const router = express.Router();

router.get('/', getMenu);
router.get('/:id', getMenuById);

module.exports = router;