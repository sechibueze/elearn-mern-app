const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../../middlewares/checkAuth');
const checkAdmin = require('../../middlewares/checkAdmin');
const router = express.Router();
const {
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
 * @route PUT /api/users/admin/:userId
 * @desc Assign/Unassign admin roles to a users
 * @access private
 */
router.put('/admin/:userId', checkAuth, toggleAuthAdmin);


module.exports = router;