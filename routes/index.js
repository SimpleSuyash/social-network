// Import the Router object from the Express framework
const router = require('express').Router();

// Import the routes for the API endpoints from the ./api 
const apiRoutes = require('./api');

// Mount the API routes under the "/api" path
router.use('/api', apiRoutes);

// router.use((req, res) => {
//     return res.send('Wrong route!');
// });

// Export the router object to be used by the main application
module.exports = router;