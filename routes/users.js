import express from 'express';
import { getUsers, createUsers, getUserByID, updateUser, deleteUser, checkLogin } from '../controllers/users.js'
import { authentication } from '../middleware/auth.js'


var router = express.Router();

// [GET] Get all foods
router.get('/', getUsers);

// [GET] Get user by ID
router.get('/:userId', authentication, getUserByID);

// [POST] Created an user
router.post('/', createUsers);

// [POST] Update an user
router.post('/update', updateUser);

// [GET] Delete user by ID
router.get('/delete/:userId', deleteUser);

// [POST] Check Login
router.post('/checklogin', checkLogin);



export default router;

