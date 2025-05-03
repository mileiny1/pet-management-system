const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
const { isAuthenticated } = require('../middleware/auth');

// @route   GET /medications/add/:petId
// @desc    Render add medication form
// @access  Private
router.get('/add/:petId', isAuthenticated, medicationController.getAddMedication);

// @route   POST /medications/add/:petId
// @desc    Add a new medication
// @access  Private
router.post('/add/:petId', isAuthenticated, medicationController.addMedication);

// @route   GET /medications/:petId
// @desc    Get medications for a pet
// @access  Private
router.get('/:petId', isAuthenticated, medicationController.getMedications);

// @route   DELETE /medications/:id
// @desc    Delete medication
// @access  Private
router.delete('/:id', isAuthenticated, medicationController.deleteMedication);

module.exports = router;