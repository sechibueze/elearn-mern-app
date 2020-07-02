
// const { validationResult } = require('express-validator');
const User = require('../models/User');
const authReducer = require('../_utils/authReducer');

// 
const getAllUsers = (req, res) => {
  
  User.find()
    .select('-password')
    .then(users => {
      if (!users) return res.status(400).json({ status: false, error: 'No such record found' });
      
      return res.status(200).json({
        status: true,
        meesage: 'All Users',
        data: users
      });
    })
    .catch(err => {
      if (err) return res.status(500).json({ status: false, error: 'No such user exists' });

    });

}
// Only Admin can UPGRADE or DOWNGRADE a User
function manageUsersAuthByAdmin(req, res) {
  // const {currentUserId : id, auth} = req.authUser;
  const userId = req.params.userId;
  const { action } = req.body;
  const filter = { _id: userId };
  User.findOne(filter)
    .select('-password')
    .then(user => {
      if (!user) return res.status(400).json({ status: false, error: 'No such record found' });
      // Change User Priviledge
      
      const newAuth = authReducer(user.auth, action)
      
      user.auth = newAuth;
      user.save(err => {
        if (err) return res.status(500).json({ status: false, error: 'Failed to approve user' });

        return res.status(200).json({
          status: true,
          meesage: 'Auth roles adjusted',
          data: user
        });
      });
    })
    .catch(err => {
      if (err) return res.status(500).json({ status: false, error: 'No such user exists' });

    });

}

// make or unmake admin
const  toggleAuthAdmin = (req, res) => {

  const {email} = req.body
  if (!email) {
    return res.status(400).json({ status: false, error: 'No valid user specified' });
  }

  User.findOne({ email })
    .select('-password')
    .then(user => {

      if (!user) return res.status(400).json({ status: false, error: 'No such record found' });
      
      // Change User Priviledge
      if (!user.auth.includes('admin')) {
        user.auth = [...user.auth, 'admin'];
      }else{
        user.auth = user.auth.filter(authStatus => authStatus !== 'admin');
      }
      
      user.save(err => {
        if (err) return res.status(500).json({ status: false, error: 'Failed to approve user' });

        return res.status(200).json({
          status: true,
          meesage: 'Admin roles adjusted',
          data: user
        });
      });
    })
    .catch(err => {
      if (err) return res.status(500).json({ status: false, error: 'No such user exists' });
    });
}

module.exports = {
  getAllUsers,
  manageUsersAuthByAdmin,
  toggleAuthAdmin
};