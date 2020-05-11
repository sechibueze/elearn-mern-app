const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
var multer = require('multer')
var upload = multer()
const checkAdmin = require('../../middlewares/checkAdmin')
const { uploadImage } = require('../../middlewares/uploadMedia')
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategory
} = require('../../controllers/categoryController');
/***
 * @route POST /api/category
 * @desc create new category
 * @access private - admin
 */
// [
//   check('title', 'Title is required').notEmpty(),
//   check('description', 'Description is required').notEmpty()
// ],
router.post('/', checkAdmin, uploadImage('category_image', 'Category'), createCategory);


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
router.get('/:categoryId', getCategoryById);

/***
 * @route PUT /api/category/:categoryId
 * @desc UPDATE one category by ID
 * @access private - admin 
 */
// router.put('/:categoryId', upload.none(), updateCategoryById);
router.put('/:categoryId', uploadImage('category_image', 'Category'), updateCategoryById);

/***
 * @route DELETE /api/category/:categoryId
 * @desc DELETE one category by ID
 * @access private - admin 
 */
router.delete('/:categoryId', deleteCategory);

module.exports = router;