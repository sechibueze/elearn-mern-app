const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../../middlewares/checkAuth');
const router = express.Router();
const {
  signup,
  login,
  getUserByToken
} = require('../../controllers/authController');
/**
 * @route POST /api/signup
 * @desc User signup
 * @access public
 */
router.post('/signup', [
  check('name', 'Name field is required').not().isEmpty(),
  check('email', 'Email field is required').isEmail(),
  check('password', 'Password field is required').isLength({min: 6})
], signup);


/**
 * @route POST /api/login
 * @desc User login
 * @access public
 */
router.post('/login', [
  check('email', 'Email field is required').isEmail(),
  check('password', 'Password field is required').isLength({ min: 6 })
], login);

/**
 * @route GEt /api/auth
 * @desc Authenticate/Identify user
 * @access private
 */
router.get('/auth', checkAuth,  getUserByToken);


module.exports = router;