const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../../middlewares/checkAuth');
const checkTeacher = require('../../middlewares/checkTeacher');
const checkAdmin = require('../../middlewares/checkAdmin');
const { uploads } = require('../../middlewares/uploadMedia');
const router = express.Router();
const {
  createCourse,
  getAllCoursesByQueryFilter,
  updateCourseById,
  deleteCourseById,
  addLesson,
  getLessonByCourseId,
  editlessonById,
  removelessonById
} = require('../../controllers/courseController');

/**
 * @route POST /api/courses
 * @desc Create a new course
 * @access private - lockAdmin
 */
router.post('/', [
  check('title', 'Title is requires').notEmpty(),
  check('description', 'Description is requires').notEmpty(),
  check('categoryId', 'Category is requires').notEmpty(),
], checkAuth, checkTeacher, createCourse);

/**
 * @route GET /api/courses
 * @desc Get ALL courses
 * @access public
 */
router.get('/', getAllCoursesByQueryFilter);


/**
 * @route PUT /api/courses/:courseId
 * @desc UPDATE course by courseId
 * @access private
 */
router.put('/:courseId', checkAuth, checkTeacher, updateCourseById);

/**
 * @route DELETE /api/courses/:courseId
 * @desc DELETE course by courseId
 * @access private
 */
router.delete('/:courseId', checkAuth, checkTeacher, deleteCourseById);

/************
 * **********LESSONS
 */

/**
 * @route POST /api/courses/:courseId
 * @desc POST Add lesson to course
 * @access private
 */
router.post('/:courseId', checkAuth, checkTeacher, uploads.single('content'), addLesson);

/**
 * @route PUT /api/courses/:courseId/lessons/:lessonId
 * @desc Edit a Lesson
 * @access private
 */
router.put('/:courseId/lessons/:lessonId', checkAuth, checkTeacher, uploads.single('content'),editlessonById);

/**
 * @route GET /api/courses/:courseId/lessons
 * @desc Get all lessons in a course
 * @access private
 */
// router.get('/:courseId/lessons', getLessonByCourseId);

/**
 * @route DELETE /api/courses/:courseId/lessons/:lessonId
 * @desc DELETE a lesson in a course
 * @access private
 */
router.delete('/:courseId/lessons/:lessonId', checkAuth, checkTeacher, removelessonById);

module.exports = router;