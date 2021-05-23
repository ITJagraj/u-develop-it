const express = require('express');
const router = express.Router();
router.use('/voterRoutes',require('./voterRoutes'));

router.use('/voterRouters',require('./candidateRoutes'));

router.use(require('./voteRoutes'));

module.exports = router;