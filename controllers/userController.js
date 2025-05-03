const User = require('../models/User');
const Pet = require('../models/Pet');

// Render home page
exports.getHome = (req, res) => {
res.render('index', { title: 'Pet Management System' });
};

// Render login page
exports.getLogin = (req, res) => {
res.render('login', { title: 'Login' });
};

// Render register page
exports.getRegister = (req, res) => {
res.render('register', { title: 'Register' });
};

// Register user
exports.registerUser = async (req, res) => {
const { username, email, password, confirmPassword } = req.body;
let errors = [];

// Validation
if (!username || !email || !password || !confirmPassword) {
errors.push({ msg: 'Please fill in all fields' });
}

if (password !== confirmPassword) {
errors.push({ msg: 'Passwords do not match' });
}

if (password.length < 6) {
errors.push({ msg: 'Password should be at least 6 characters' });
}

if (errors.length > 0) {
return res.render('register', {
title: 'Register',
errors,
username,
email
});
}

try {
// Check if email already exists
const existingUser = await User.findOne({ email });
if (existingUser) {
errors.push({ msg: 'Email is already registered' });
return res.render('register', {
title: 'Register',
errors,
username,
email
});
}

// Create new user
const newUser = new User({
username,
email,
password
});

await newUser.save();
req.flash('success_msg', 'You are now registered and can log in');
res.redirect('/login');
} catch (err) {
console.error(err);
req.flash('error_msg', 'Registration failed');
res.redirect('/register');
}
};

// Login user
exports.loginUser = async (req, res) => {
const { email, password } = req.body;

try {
// Find user by email
const user = await User.findOne({ email });
if (!user) {
req.flash('error_msg', 'That email is not registered');
return res.redirect('/login');
}

// Match password
const isMatch = await user.comparePassword(password);
if (!isMatch) {
req.flash('error_msg', 'Password incorrect');
return res.redirect('/login');
}

// Create session
req.session.user = {
id: user._id,
username: user.username,
email: user.email
};

res.redirect('/dashboard');
} catch (err) {
console.error(err);
req.flash('error_msg', 'Login failed');
res.redirect('/login');
}
};

// Render dashboard
exports.getDashboard = async (req, res) => {
try {
const pets = await Pet.find({ user: req.session.user.id });
res.render('dashboard', {
title: 'Dashboard',
pets
});
} catch (err) {
console.error(err);
req.flash('error_msg', 'Failed to load dashboard');
res.redirect('/');
}
};

// Logout user
exports.logoutUser = (req, res) => {
req.session.destroy((err) => {
if (err) {
console.error(err);
return res.redirect('/dashboard');
}
res.redirect('/login');
});
};