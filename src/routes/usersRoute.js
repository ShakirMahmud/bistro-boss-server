const express = require('express');
const { getAllUsers, postUsers } = require('../controllers/usersController');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', postUsers);

module.exports = router;