const mongoose = require('mongoose');
const MedicationSchema = new mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pet',
        required: true
    },

    medicationName: {
        type: String,
        required: true,
        trim: true
    },
    dosage: {
        type: String,
        required: true,
        trim: true
    },
    frequency: {
    type: String, 
    required: true,
    trim: true
    },

    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },

notes: {
    type: String,
    trim: true
},
 createdAt: {
    type: Date,
    default: Date.now
 }  

});

module.exports = mongoose.model('Medication', MedicationSchema);


