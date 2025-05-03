const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { isAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route GET /pets/add
// @desc Render add pet form
// @access Private
router.get('/add', isAuthenticated, petController.getAddPet);

// @route POST /pets/add
// @desc Add a new pet
// @access Private
router.post('/add', isAuthenticated, upload.single('picture'), petController.addPet);

// @route GET /pets/:id
// @desc View pet details
// @access Private
router.get('/:id', isAuthenticated, petController.getPetDetails);

// @route GET /pets/edit/:id
// @desc Render edit pet form
// @access Private
router.get('/edit/:id', isAuthenticated, petController.getEditPet);

// @route PUT /pets/:id
// @desc Update pet
// @access Private
router.put('/:id', isAuthenticated, upload.single('picture'), petController.updatePet);

// @route DELETE /pets/:id
// @desc Delete pet
// @access Private
router.delete('/:id', isAuthenticated, petController.deletePet);

module.exports = router;