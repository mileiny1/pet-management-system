const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const session= require('express-sessions');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const methodOveride = require('method-overide');

// Load environment variables
 dotenv.config();

 // Connect to MongoDB

 require('./config/db');

 // Initialize Express
 const app = express();

 // Ejs Setup
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  
// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup 
app.use(session({
  secret:process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 // 1 day
  }
}));

// Flash messages 
app.use(flash());

// Global variables 
app.use((req, res, next) => {
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');
res.locals.user = req.session.user || null;
next();

});

// Routes
app.use('/', require('./routes/userRoutes'));
app.use('/pets', require('./routes/petRoutes'));
app.use('/food-logs', require('./routes/foodLogRoutes'));
app.use('/vet-visits', require('./routes/vetVisitRoutes'));
app.use('/appointments', require('./routes/appointmentRoute'));
app.use('/medications', require('./routes/medicationRoutes'));

// 404 routes
app.use((req, res) => {
  res.status(404).render('404', {
  little:'404' - 'Page Not Found'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






