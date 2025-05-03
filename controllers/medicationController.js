const Medication = require('../models/Medication');
const Pet = require('../models/Pet');

// Render add medication form
exports.getAddMedication = async (req, res) => {
  try {
    const petId = req.params.petId;
    const pet = await Pet.findById(petId);
    
    // Check if pet exists and belongs to user
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Pet not found or unauthorized');
      return res.redirect('/dashboard');
    }
    
    res.render('medication/add', {
      title: `Add Medication for ${pet.name}`,
      pet
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to load medication form');
    res.redirect('/dashboard');
  }
};

// Add a new medication
exports.addMedication = async (req, res) => {
  const { medicationName, dosage, frequency, startDate, endDate, notes } = req.body;
  const petId = req.params.petId;
  
  try {
    const pet = await Pet.findById(petId);
    
    // Check if pet exists and belongs to user
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Pet not found or unauthorized');
      return res.redirect('/dashboard');
    }

    const newMedication = new Medication({
      pet: petId,
      medicationName,
      dosage,
      frequency,
      startDate,
      endDate,
      notes
    });

    await newMedication.save();
    req.flash('success_msg', 'Medication added successfully');
    res.redirect(`/pets/${petId}`);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to add medication');
    res.redirect(`/medications/add/${petId}`);
  }
};

// Get medications for a pet
exports.getMedications = async (req, res) => {
  try {
    const petId = req.params.petId;
    const pet = await Pet.findById(petId);
    
    // Check if pet exists and belongs to user
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Pet not found or unauthorized');
      return res.redirect('/dashboard');
    }

    const medications = await Medication.find({ pet: petId }).sort({ startDate: -1 });
    
    res.render('medication/list', {
      title: `${pet.name}'s Medications`,
      pet,
      medications
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to load medications');
    res.redirect('/dashboard');
  }
};

// Delete medication
exports.deleteMedication = async (req, res) => {
  try {
    const medicationId = req.params.id;
    const medication = await Medication.findById(medicationId);
    
    if (!medication) {
      req.flash('error_msg', 'Medication not found');
      return res.redirect('/dashboard');
    }
    
    // Check if the associated pet belongs to the user
    const pet = await Pet.findById(medication.pet);
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Unauthorized');
      return res.redirect('/dashboard');
    }
    
    await medication.deleteOne();
    req.flash('success_msg', 'Medication deleted successfully');
    res.redirect(`/pets/${medication.pet}`);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to delete medication');
    res.redirect('/dashboard');
  }
};