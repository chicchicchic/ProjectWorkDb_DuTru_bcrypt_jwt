import express from 'express';
import { getFoods, getFoodByID, createFoods, updateFood, deleteFood } from '../controllers/foods.js'


var router = express.Router();

// [GET] Get all foods
router.get('/', getFoods);

// [GET] Get food by ID
router.get('/:foodId', getFoodByID);

// [POST] Created a dish
router.post('/', createFoods);

// [POST] Update a dish
router.post('/update', updateFood);

// [GET] Delete food by ID
router.get('/delete/:foodId', deleteFood);


export default router;

