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


