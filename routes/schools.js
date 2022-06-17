const express = require('express');
const { getSchools, getSchool } = require('../controllers/school')
const router = express.Router();

router.route('/').get(getSchools);
router.route('/:id').get(getSchool);

module.exports = router;