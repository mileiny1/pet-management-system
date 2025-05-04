const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');

// Render add appointment form
exports.getAddAppointment = async (req, res) => {
  try {
    const petId = req.params.petId;
    const pet = await Pet.findById(petId);
    
    // Check if pet exists and belongs to user
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Pet not found or unauthorized');
      return res.redirect('/dashboard');
    }
    
    res.render('appointment/add', {
      title: `Add Appointment for ${pet.name}`,
      pet
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to load appointment form');
    res.redirect('/dashboard');
  }
};

// Add a new appointment
exports.addAppointment = async (req, res) => {
  const { appointmentDate, appointmentType, reminderTime, notes } = req.body;
  const petId = req.params.petId;
  
  try {
    const pet = await Pet.findById(petId);
    
    // Check if pet exists and belongs to user
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Pet not found or unauthorized');
      return res.redirect('/dashboard');
    }

    const newAppointment = new Appointment({
      pet: petId,
      appointmentDate,
      appointmentType,
      reminderTime,
      notes
    });

    await newAppointment.save();
    req.flash('success_msg', 'Appointment added successfully');
    res.redirect(`/pets/${petId}`);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to add appointment');
    res.redirect(`/appointments/add/${petId}`);
  }
};

// Get appointments for a pet
exports.getAppointments = async (req, res) => {
  try {
    const petId = req.params.petId;
    const pet = await Pet.findById(petId);
    
    // Check if pet exists and belongs to user
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Pet not found or unauthorized');
      return res.redirect('/dashboard');
    }

    const appointments = await Appointment.find({ pet: petId }).sort({ appointmentDate: 1 });
    
    res.render('appointment/list', {
      title: `${pet.name}'s Appointments`,
      pet,
      appointments
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to load appointments');
    res.redirect('/dashboard');
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      req.flash('error_msg', 'Appointment not found');
      return res.redirect('/dashboard');
    }
    
    // Check if the associated pet belongs to the user
    const pet = await Pet.findById(appointment.pet);
    if (!pet || pet.user.toString() !== req.session.user.id) {
      req.flash('error_msg', 'Unauthorized');
      return res.redirect('/dashboard');
    }
    
    await appointment.deleteOne();
    req.flash('success_msg', 'Appointment deleted successfully');
    res.redirect(`/pets/${appointment.pet}`);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to delete appointment');
    res.redirect('/dashboard');
  }
};