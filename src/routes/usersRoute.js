const express = require('express');
const { getAllUsers, postUsers, deleteUser, makeAdmin, makeUser } = require('../controllers/usersController');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', postUsers);
router.delete('/:id', deleteUser);
router.patch('/admin/:id', makeAdmin);
router.patch('/user/:id', makeUser);

module.exports = router;