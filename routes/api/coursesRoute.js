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

  subscribeUserToCourse,
  unsubscribeUserToCourse,
  getCourseSubscriptionByUserId,

  addLesson,
  getLessonByCourseId,
  editlessonById,
  removelessonById,
  toggleCourseVisibility
} = require('../../controllers/courseController');

/**
 * @route POST /api/courses
 * @desc Create a new course
 * @access private - lockAdmin
 */
router.post('/', checkAuth, checkTeacher, uploads.single('courseImage'), [
  check('title', 'Title is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('categoryId', 'Category is required').notEmpty(),
],  createCourse);

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
router.put('/:courseId', checkAuth, checkTeacher, uploads.single('courseImage'), updateCourseById);

/**
 * @route PUT /api/courses/:courseId/visibility
 * @desc Publish or Unpublish a course with a lesson
 * @access private
 */
router.put('/:courseId/visibility', checkAuth, checkTeacher, toggleCourseVisibility);

/**
 * @route GET /api/courses/subscriptions
 * @desc GET All Courses that a User is subscribed to
 * @access private
 */
router.get('/subscriptions', checkAuth, getCourseSubscriptionByUserId);
/**
 * @route PUT /api/courses/:courseId/subscriptions
 * @desc Subscribe User to a course
 * @access private
 */
router.put('/:courseId/subscriptions', checkAuth, subscribeUserToCourse);

/**
 * @route PUT /api/courses/:courseId/unsubscribe
 * @desc Subscribe User to a course
 * @access private
 */
router.put('/:courseId/unsubscribe', checkAuth, unsubscribeUserToCourse);

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