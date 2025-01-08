const express = require('express');
const { getAllUsers, postUsers, deleteUser, makeAdmin, makeUser, getAdmins } = require('../controllers/usersController');
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, getAllUsers);
router.post('/', postUsers);
router.delete('/:id',verifyToken, verifyAdmin, deleteUser);
router.patch('/admin/:id',verifyToken, verifyAdmin, makeAdmin);
router.patch('/user/:id',verifyToken, verifyAdmin, makeUser);
router.get('/admin/:email',verifyToken, getAdmins);

module.exports = router;