const express = require('express');
const router = express.Router();
const foodLogController = require('../controllers/foodLogController');
const { isAuthenticated } = require('../middleware/auth');

// @route GET /food-logs/add/:petId
// @desc Render add food log form
// @access Private
router.get('/add/:petId', isAuthenticated, foodLogController.getAddFoodLog);

// @route POST /food-logs/add/:petId
// @desc Add a new food log
// @access Private
router.post('/add/:petId', isAuthenticated, foodLogController.addFoodLog);

// @route GET /food-logs/:petId
// @desc Get food logs for a pet
// @access Private
router.get('/:petId', isAuthenticated, foodLogController.getFoodLogs);

// @route DELETE /food-logs/:id
// @desc Delete food log
// @access Private
router.delete('/:id', isAuthenticated, foodLogController.deleteFoodLog);

module.exports = router;
