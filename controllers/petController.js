const Pet = require('../models/Pet');
const FoodLog = require('../models/FoodLog');
const VetVisit = require('../models/VetVisit');
const Appointment = require('../models/Appointment');
const Medication = require('../models/Medication');
const fs = require('fs');
const path = require('path');

// Render add pet form
exports.getAddPet = (req, res) => {
res.render('pet/add', { title: 'Add New Pet' });
};

// Add a new pet
exports.addPet = async (req, res) => {
const { name, species, breed, dob, weight, specialNotes } = req.body;
const userId = req.session.user.id;

try {
// Create new pet object
const newPet = new Pet({
user: userId,
name,
species,
breed,
dob,
weight,
specialNotes
});

// If image was uploaded
if (req.file) {
newPet.picture = req.file.filename;
}

await newPet.save();
req.flash('success_msg', 'Pet added successfully');
res.redirect('/dashboard');
} catch (err) {
console.error(err);
req.flash('error_msg', 'Failed to add pet');
res.redirect('/pets/add');
}
};

// Render pet details
exports.getPetDetails = async (req, res) => {
try {
const pet = await Pet.findById(req.params.id);

// Check if pet exists and belongs to user
if (!pet || pet.user.toString() !== req.session.user.id) {
req.flash('error_msg', 'Pet not found or unauthorized');
return res.redirect('/dashboard');
}

// Get related records
const foodLogs = await FoodLog.find({ pet: pet._id }).sort({ feedingTime: -1 });
const vetVisits = await VetVisit.find({ pet: pet._id }).sort({ visitDate: -1 });
const appointments = await Appointment.find({ pet: pet._id }).sort({ appointmentDate: 1 });
const medications = await Medication.find({ pet: pet._id }).sort({ startDate: -1 });

res.render('pet/view', {
title: `${pet.name}'s Details`,
pet,
foodLogs,
vetVisits,
appointments,
medications
});
} catch (err) {
console.error(err);
req.flash('error_msg', 'Failed to load pet details');
res.redirect('/dashboard');
}
};

// Render edit pet form
exports.getEditPet = async (req, res) => {
try {
const pet = await Pet.findById(req.params.id);

// Check if pet exists and belongs to user
if (!pet || pet.user.toString() !== req.session.user.id) {
req.flash('error_msg', 'Pet not found or unauthorized');
return res.redirect('/dashboard');
}

res.render('pet/edit', {
title: `Edit ${pet.name}`,
pet
});
} catch (err) {
console.error(err);
req.flash('error_msg', 'Failed to load edit form');
res.redirect('/dashboard');
}
};

// Update pet
exports.updatePet = async (req, res) => {
const { name, species, breed, dob, weight, specialNotes } = req.body;

try {
const pet = await Pet.findById(req.params.id);

// Check if pet exists and belongs to user
if (!pet || pet.user.toString() !== req.session.user.id) {
req.flash('error_msg', 'Pet not found or unauthorized');
return res.redirect('/dashboard');
}

// Update pet data
pet.name = name;
pet.species = species;
pet.breed = breed;
pet.dob = dob;
pet.weight = weight;
pet.specialNotes = specialNotes;

// If new image was uploaded
if (req.file) {
// Delete old image if it's not the default
if (pet.picture !== 'default-pet.jpg') {
const oldImagePath = path.join(__dirname, '../public/uploads/', pet.picture);
if (fs.existsSync(oldImagePath)) {
fs.unlinkSync(oldImagePath);
}
}
pet.picture = req.file.filename;
}

await pet.save();
req.flash('success_msg', 'Pet updated successfully');
res.redirect(`/pets/${pet._id}`);
} catch (err) {
console.error(err);
req.flash('error_msg', 'Failed to update pet');
res.redirect(`/pets/edit/${req.params.id}`);
}
};

// Delete pet
exports.deletePet = async (req, res) => {
try {
const pet = await Pet.findById(req.params.id);

// Check if pet exists and belongs to user
if (!pet || pet.user.toString() !== req.session.user.id) {
req.flash('error_msg', 'Pet not found or unauthorized');
return res.redirect('/dashboard');
}

// Delete associated records
await FoodLog.deleteMany({ pet: pet._id });
await VetVisit.deleteMany({ pet: pet._id });
await Appointment.deleteMany({ pet: pet._id });
await Medication.deleteMany({ pet: pet._id });

// Delete pet image if it's not the default
if (pet.picture !== 'default-pet.jpg') {
const imagePath = path.join(__dirname, '../public/uploads/', pet.picture);
if (fs.existsSync(imagePath)) {
fs.unlinkSync(imagePath);
}
}

// Delete pet
await pet.deleteOne();
req.flash('success_msg', 'Pet deleted successfully');
res.redirect('/dashboard');
} catch (err) {
console.error(err);
req.flash('error_msg', 'Failed to delete pet');
res.redirect('/dashboard');
}
};