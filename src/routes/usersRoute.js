const express = require('express');
const { getAllUsers, postUsers, deleteUser, makeAdmin, makeUser, getAdmins } = require('../controllers/usersController');
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/', verifyToken, getAllUsers);
router.post('/', postUsers);
router.delete('/:id', deleteUser);
router.patch('/admin/:id', makeAdmin);
router.patch('/user/:id', makeUser);
router.get('/admin/:email',verifyToken, getAdmins);

module.exports = router;