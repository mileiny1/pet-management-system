const mongoose = require ('mongoose');

// MongoDB connection string from the environment variables or default
const MongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017 pet-management';

// Connect to MongoDB

mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})


.then(() => {
console.log('MongoDB Connected...');
})
.catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
});


