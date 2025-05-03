const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { isAuthenticated } = require('../middleware/auth');

// @route   GET /appointments/add/:petId
// @desc    Render add appointment form
// @access  Private
router.get('/add/:petId', isAuthenticated, appointmentController.getAddAppointment);

// @route   POST /appointments/add/:petId
// @desc    Add a new appointment
// @access  Private
router.post('/add/:petId', isAuthenticated, appointmentController.addAppointment);

// @route   GET /appointments/:petId
// @desc    Get appointments for a pet
// @access  Private
router.get('/:petId', isAuthenticated, appointmentController.getAppointments);

// @route   DELETE /appointments/:id
// @desc    Delete appointment
// @access  Private
router.delete('/:id', isAuthenticated, appointmentController.deleteAppointment);

module.exports = router;