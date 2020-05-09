const express = require('express');

const router = express.Router();
const {
  getAllCourses
} = require('../../controllers/courses');
/**
 * @route GET /api/courses
 * @desc User signup
 * @access public
 */
router.get('/', getAllCourses);

module.exports = router;