// Import the Express router to create a new router instance for handling API routes
const router = require('express').Router();

// Import separate route modules for different functionalities
const userRoutes = require('./user-routes'); // Routes for user-related operations
const thoughtRoutes = require('./thought-routes'); // Routes for thought operations


// Mount the imported route modules onto the main router
router.use('/users', userRoutes); // Handle user routes under '/users' prefix
router.use('/thoughts', thoughtRoutes); // Handle thought routes under '/thoughts' prefix

// Export the router for use in other parts of the application
module.exports = router;