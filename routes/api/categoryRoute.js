const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const checkAuth = require('../../middlewares/checkAuth');
const checkAdmin = require('../../middlewares/checkAdmin');
const { uploads } = require('../../middlewares/uploadMedia')
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  getCoursesInCategory,
  updateCategoryById,
  deleteCategory
} = require('../../controllers/categoryController');
/***
 * @route POST /api/category
 * @desc create new category
 * @access private - admin
 */

router.post('/', 
  checkAuth,
  checkAdmin,
   uploads.single('category_image'), 
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
  ],
 createCategory);


/***
 * @route GET /api/category
 * @desc get all category
 * @access public 
 */
router.get('/', getAllCategory);

/***
 * @route GET /api/category/:categoryId
 * @desc get one category by ID
 * @access public 
 */
router.get('/:categoryId',  getCategoryById);

/***
 * @route GET /api/category/courses/:categoryId
 * @desc get courses in category
 * @access public 
 */
router.get('/courses/:categoryId', getCoursesInCategory);

/***
 * @route PUT /api/category/:categoryId
 * @desc UPDATE one category by ID
 * @access private - admin 
 */
// router.put('/:categoryId', upload.none(), updateCategoryById);
router.put('/:categoryId',
  checkAuth, checkAdmin,
 uploads.single('category_image'), updateCategoryById);

/***
 * @route DELETE /api/category/:categoryId
 * @desc DELETE one category by ID
 * @access private - admin 
 */
router.delete('/:categoryId',
checkAuth,
checkAdmin,
 deleteCategory);

module.exports = router;