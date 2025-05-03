const mongoose = require('mongoose');

const VetVisitSchema = new mongoose.Schema({
pet: {
type: mongoose.Schema.Types.ObjectId,
ref: 'Pet',
required: true
},
visitDate: {
type: Date,
required: true
},
vetName: {
type: String,
required: true,
trim: true
},
reasonForVisit: {
type: String,
required: true,
trim: true
},
treatmentGiven: {
type: String,
trim: true
},
petBriidBreed: {
type: String,
trim: true
},
additionalNotes: {
type: String,
trim: true
},
createdAt: {
type: Date,
default: Date.now
}
});

module.exports = mongoose.model('VetVisit', VetVisitSchema);
