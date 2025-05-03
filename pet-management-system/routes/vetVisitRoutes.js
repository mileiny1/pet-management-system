const express = require('express');
const router = express.Router();
const vetVisitController = require('../controllers/vetVisitController');
const { isAuthenticated } = require('../middleware/auth');

// @route   GET /vet-visits/add/:petId
// @desc    Render add vet visit form
// @access  Private
router.get('/add/:petId', isAuthenticated, vetVisitController.getAddVetVisit);

// @route   POST /vet-visits/add/:petId
// @desc    Add a new vet visit
// @access  Private
router.post('/add/:petId', isAuthenticated, vetVisitController.addVetVisit);

// @route   GET /vet-visits/:petId
// @desc    Get vet visits for a pet
// @access  Private
router.get('/:petId', isAuthenticated, vetVisitController.getVetVisits);

// @route   DELETE /vet-visits/:id
// @desc    Delete vet visit
// @access  Private
router.delete('/:id', isAuthenticated, vetVisitController.deleteVetVisit);

module.exports = router;