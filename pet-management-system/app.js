const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const methodOverride = require('method-override');

// Load environment variables
dotenv.config();

// Connect to MongoDB
require('./config/db');

// Initialize Express
const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware stack
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true // Additional security
  }
}));

// Flash messages
app.use(flash());

// Global middleware for template variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.session.user || null;
  next();
});

// Routes with debugging
console.log('Loading routes...');

// Load userRoutes
try {
  console.log('Loading userRoutes...');
  const userRoutes = require('./routes/userRoutes');
  console.log('userRoutes type:', typeof userRoutes);
  console.log('userRoutes keys:', Object.keys(userRoutes));
  if (typeof userRoutes === 'function') {
    app.use('/', userRoutes);
    console.log('✅ userRoutes loaded successfully');
  } else {
    console.error('❌ userRoutes is not a function');
  }
} catch (error) {
  console.error('❌ Error loading userRoutes:', error.message);
}

// Load petRoutes
try {
  console.log('Loading petRoutes...');
  const petRoutes = require('./routes/petRoutes');
  console.log('petRoutes type:', typeof petRoutes);
  console.log('petRoutes keys:', Object.keys(petRoutes));
  if (typeof petRoutes === 'function') {
    app.use('/pets', petRoutes);
    console.log('✅ petRoutes loaded successfully');
  } else {
    console.error('❌ petRoutes is not a function');
  }
} catch (error) {
  console.error('❌ Error loading petRoutes:', error.message);
}

// Load foodLogRoutes
try {
  console.log('Loading foodLogRoutes...');
  const foodLogRoutes = require('./routes/foodLogRoutes');
  console.log('foodLogRoutes type:', typeof foodLogRoutes);
  console.log('foodLogRoutes keys:', Object.keys(foodLogRoutes));
  if (typeof foodLogRoutes === 'function') {
    app.use('/food-logs', foodLogRoutes);
    console.log('✅ foodLogRoutes loaded successfully');
  } else {
    console.error('❌ foodLogRoutes is not a function');
  }
} catch (error) {
  console.error('❌ Error loading foodLogRoutes:', error.message);
}

// Load vetVisitRoutes
try {
  console.log('Loading vetVisitRoutes...');
  const vetVisitRoutes = require('./routes/vetVisitRoutes');
  console.log('vetVisitRoutes type:', typeof vetVisitRoutes);
  console.log('vetVisitRoutes keys:', Object.keys(vetVisitRoutes));
  if (typeof vetVisitRoutes === 'function') {
    app.use('/vet-visits', vetVisitRoutes);
    console.log('✅ vetVisitRoutes loaded successfully');
  } else {
    console.error('❌ vetVisitRoutes is not a function');
  }
} catch (error) {
  console.error('❌ Error loading vetVisitRoutes:', error.message);
}

// Load appointmentRoutes
try {
  console.log('Loading appointmentRoutes...');
  const appointmentRoutes = require('./routes/appointmentRoutes');
  console.log('appointmentRoutes type:', typeof appointmentRoutes);
  console.log('appointmentRoutes keys:', Object.keys(appointmentRoutes));
  if (typeof appointmentRoutes === 'function') {
    app.use('/appointments', appointmentRoutes);
    console.log('✅ appointmentRoutes loaded successfully');
  } else {
    console.error('❌ appointmentRoutes is not a function');
  }
} catch (error) {
  console.error('❌ Error loading appointmentRoutes:', error.message);
}

// Load medicationRoutes
try {
  console.log('Loading medicationRoutes...');
  const medicationRoutes = require('./routes/medicationRoutes');
  console.log('medicationRoutes type:', typeof medicationRoutes);
  console.log('medicationRoutes keys:', Object.keys(medicationRoutes));
  if (typeof medicationRoutes === 'function') {
    app.use('/medications', medicationRoutes);
    console.log('✅ medicationRoutes loaded successfully');
  } else {
    console.error('❌ medicationRoutes is not a function');
  }
} catch (error) {
  console.error('❌ Error loading medicationRoutes:', error.message);
}

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: '404 - Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}).on('error', (error) => {
  console.error('Server error:', error);
});




