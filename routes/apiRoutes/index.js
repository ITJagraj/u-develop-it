const express = require('express');
const router = express.Router();
const voterRoutes = require('./voteRoutes.js');
router.use('/voterRoutes', voterRoutes);

router.use('/voterRouters',require('./candidateRoutes'));

router.use(require('./voteRoutes'));

module.exports = router;