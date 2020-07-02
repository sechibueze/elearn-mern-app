const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../../middlewares/checkAuth');
const checkAdmin = require('../../middlewares/checkAdmin');
const router = express.Router();
const {
  getAllUsers,
  manageUsersAuthByAdmin,
  toggleAuthAdmin
} = require('../../controllers/userControllers');

/**
 * @route PUT /api/users/:userId
 * @desc Admin Assign new roles to users
 * @access private
 */
router.put('/:userId', checkAuth, checkAdmin, manageUsersAuthByAdmin);

/**
 * @route PUT /api/users
 * @desc Admin can get ALL Users
 * @access private
 */
router.get('/', //checkAuth, checkAdmin, 
getAllUsers);

/**
 * @route PUT /api/users/admin/:userId
 * @desc Assign/Unassign admin roles to a users
 * @access private
 */
router.put('/admin/toggle', 
[ check('email', 'Email field is required').isEmail()],
toggleAuthAdmin);


module.exports = router;