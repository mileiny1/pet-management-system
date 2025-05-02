const mongoose = require('mongoose');
const FoodLogSchema = new mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet', 
        required: true

    },
    foodType: {
        type: String,
        required: true,
        trim: true
    },
    feedingTime: {
        type: Date,
        required: true, 
        default:Date.now
    },
    portionSize: {
    type: String,
    required: true,
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
module.exports = mongoose.model('FoodLog', FoodLogSchema);