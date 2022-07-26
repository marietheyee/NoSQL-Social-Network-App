// required
const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// route names
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// export routes
module.exports = router;