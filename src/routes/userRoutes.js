const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');


const {getUsers, getOneUser, createUser, updateUser, deleteUser} = controller;

router.get('/', getUsers);
router.get('/:id', getOneUser);
router.post('/',createUser);

router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

module.exports = router;