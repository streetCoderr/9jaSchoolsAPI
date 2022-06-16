const express = require('express');
const { getSchools, getSchoolsStatic } = require('../controllers/school')
const router = express.Router();

router.route('/').get(getSchools);
router.route('/static').get(getSchoolsStatic);

module.exports = router;