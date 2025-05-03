const FoodLog = require('../models/FoodLog');
const Pet = require('../models/Pet');

// Render add food log form
exports.getAddFoodLog = async (req, res) => {
  try {
    const petId = req.params.petId;
    const pet = await Pet.findById(petId);
    
    // Check if pet exists and belongs to user
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Pet not found or unauthorized');
      return res.redirect('/dashboard');
    }
    
    res.render('foodLog/add', {
      title: `Add Food Log for ${pet.name}`,
      pet
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to load food log form');
    res.redirect('/dashboard');
  }
};

// Add a new food log
exports.addFoodLog = async (req, res) => {
  const { foodType, feedingTime, portionSize, additionalNotes } = req.body;
  const petId = req.params.petId;
  
  try {
    const pet = await Pet.findById(petId);
    
    // Check if pet exists and belongs to user
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Pet not found or unauthorized');
      return res.redirect('/dashboard');
    }

    const newFoodLog = new FoodLog({
      pet: petId,
      foodType,
      feedingTime,
      portionSize,
      additionalNotes
    });

    await newFoodLog.save();
    req.flash('success_msg', 'Food log added successfully');
    res.redirect(`/pets/${petId}`);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to add food log');
    res.redirect(`/food-logs/add/${petId}`);
  }
};

// Get food logs for a pet
exports.getFoodLogs = async (req, res) => {
  try {
    const petId = req.params.petId;
    const pet = await Pet.findById(petId);
    
    // Check if pet exists and belongs to user
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Pet not found or unauthorized');
      return res.redirect('/dashboard');
    }

    const foodLogs = await FoodLog.find({ pet: petId }).sort({ feedingTime: -1 });
    
    res.render('foodLog/list', {
      title: `${pet.name}'s Food Logs`,
      pet,
      foodLogs
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to load food logs');
    res.redirect('/dashboard');
  }
};

// Delete food log
exports.deleteFoodLog = async (req, res) => {
  try {
    const foodLogId = req.params.id;
    const foodLog = await FoodLog.findById(foodLogId);
    
    if (!foodLog) {
      req.flash('error_msg', 'Food log not found');
      return res.redirect('/dashboard');
    }
    
    // Check if the associated pet belongs to the user
    const pet = await Pet.findById(foodLog.pet);
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Unauthorized');
      return res.redirect('/dashboard');
    }
    
    await foodLog.deleteOne();
    req.flash('success_msg', 'Food log deleted successfully');
    res.redirect(`/pets/${foodLog.pet}`);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to delete food log');
    res.redirect('/dashboard');
  }
};