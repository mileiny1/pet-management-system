const VetVisit = require('../models/VetVisit');
const Pet = require('../models/Pet');

// Render add vet visit form
exports.getAddVetVisit = async (req, res) => {
  try {
    const petId = req.params.petId;
    const pet = await Pet.findById(petId);
    
    // Check if pet exists and belongs to user
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Pet not found or unauthorized');
      return res.redirect('/dashboard');
    }
    
    res.render('vetVisit/add', {
      title: `Add Vet Visit for ${pet.name}`,
      pet
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to load vet visit form');
    res.redirect('/dashboard');
  }
};

// Add a new vet visit
exports.addVetVisit = async (req, res) => {
  const { visitDate, vetName, reasonForVisit, treatmentGiven, petBriidBreed, additionalNotes } = req.body;
  const petId = req.params.petId;
  
  try {
    const pet = await Pet.findById(petId);
    
    // Check if pet exists and belongs to user
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Pet not found or unauthorized');
      return res.redirect('/dashboard');
    }

    const newVetVisit = new VetVisit({
      pet: petId,
      visitDate,
      vetName,
      reasonForVisit,
      treatmentGiven,
      petBriidBreed,
      additionalNotes
    });

    await newVetVisit.save();
    req.flash('success_msg', 'Vet visit added successfully');
    res.redirect(`/pets/${petId}`);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to add vet visit');
    res.redirect(`/vet-visits/add/${petId}`);
  }
};

// Get vet visits for a pet
exports.getVetVisits = async (req, res) => {
  try {
    const petId = req.params.petId;
    const pet = await Pet.findById(petId);
    
    // Check if pet exists and belongs to user
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Pet not found or unauthorized');
      return res.redirect('/dashboard');
    }

    const vetVisits = await VetVisit.find({ pet: petId }).sort({ visitDate: -1 });
    
    res.render('vetVisit/list', {
      title: `${pet.name}'s Vet Visits`,
      pet,
      vetVisits
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to load vet visits');
    res.redirect('/dashboard');
  }
};

// Delete vet visit
exports.deleteVetVisit = async (req, res) => {
  try {
    const vetVisitId = req.params.id;
    const vetVisit = await VetVisit.findById(vetVisitId);
    
    if (!vetVisit) {
      req.flash('error_msg', 'Vet visit not found');
      return res.redirect('/dashboard');
    }
    
    // Check if the associated pet belongs to the user
    const pet = await Pet.findById(vetVisit.pet);
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Unauthorized');
      return res.redirect('/dashboard');
    }
    
    await vetVisit.deleteOne();
    req.flash('success_msg', 'Vet visit deleted successfully');
    res.redirect(`/pets/${vetVisit.pet}`);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to delete vet visit');
    res.redirect('/dashboard');
  }
};