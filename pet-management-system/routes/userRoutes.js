const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated, isNotAuthenticated } = require('../middleware/auth');

// @route GET /
// @desc Render home page
// @access Public
router.get('/', userController.getHome);

// @route GET /login
// @desc Render login page
// @access Public
router.get('/login', isNotAuthenticated, userController.getLogin);

// @route GET /register
// @desc Render register page
// @access Public
router.get('/register', isNotAuthenticated, userController.getRegister);

// @route POST /register
// @desc Register a new user
// @access Public
router.post('/register', isNotAuthenticated, userController.registerUser);

// @route POST /login
// @desc Login user
// @access Public
router.post('/login', isNotAuthenticated, userController.loginUser);

// @route GET /dashboard
// @desc Render dashboard
// @access Private
router.get('/dashboard', isAuthenticated, userController.getDashboard);

// @route GET /logout
// @desc Logout user
// @access Private
router.get('/logout', isAuthenticated, userController.logoutUser);

module.exports = router;

