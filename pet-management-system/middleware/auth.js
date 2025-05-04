/**
 * Middleware to check if the user is authenticated
 */
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    req.flash('error_msg', 'Please log in to access this resource');
    res.redirect('/login');
  };
  
  /**
   * Middleware to check if the user is not authenticated (for login/register pages)
   */
  const isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    res.redirect('/dashboard');
  };
  
  module.exports = {
    isAuthenticated,
    isNotAuthenticated
  };