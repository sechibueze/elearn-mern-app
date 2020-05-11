const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
  createCourse,
  // getAllCourses,
  getAllCoursesByQueryFilter,
  updateCourseById,
  deleteCourseById
} = require('../../controllers/courseController');

/**
 * @route POSt /api/courses
 * @desc Create a new course
 * @access private - lockAdmin
 */
router.post('/', [
  check('title', 'Title is requires').notEmpty(),
  check('description', 'Description is requires').notEmpty(),
  check('categoryId', 'Category is requires').notEmpty(),
], createCourse);

/**
 * @route GET /api/courses?
 * @desc Get ALL courses
 * @access public
 */
router.get('/', getAllCoursesByQueryFilter);


/**
 * @route PUT /api/courses/:courseId
 * @desc UPDATE course by courseId
 * @access private
 */
router.put('/:courseId', updateCourseById);

/**
 * @route DELETE /api/courses/:courseId
 * @desc DELETE course by courseId
 * @access private
 */
router.delete('/:courseId', deleteCourseById);


module.exports = router;