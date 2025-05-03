const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },

    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentType: {
        type: String,
        required: true,
        trim: true,
    },

    reminderTime: {
        type: Date,
    },
    note: {
        type: String,
        trim: true

    },
    createdAt: {
        type: Date,
        default: Date.now

    },
  

});
module.exports = mongoose.model('Appointment', AppointmentSchema);