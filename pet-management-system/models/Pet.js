const mongoose = require('mongoose');
const PetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    species: {
        type: String,
        required: true,
        enum:['dog', 'cat', 'other'],
        trim: true
    },
    breed: {
        type: String,
        trim: true
    },
    dob: {
    type: Date
},
weight: {
    type: Number

},
specialNote: {
    type: String
},
picture: {
    type: String,
    default: 'default-pet.jpg'
},

createdAt: {
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model('Pet', PetSchema);
