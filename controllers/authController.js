const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// Signup/register new users
const signup = (req, res) => {
  
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }

  // Passed all validations
  const { name, email, password } = req.body;
  User.findOne({ email }, (err , user) => {
    if ( err ) return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve record'});
    
    if ( user ) return res.status(400).json({ status: false, error: 'User record already exist'});

    // new User
    const newUser = new User({name, email, password});
    // Hash password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to generate salt' });

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to hash password' });

        newUser.password = hash;
        newUser.save(err => {
          if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to save user' });

          const payload = { id : newUser._id, auth: newUser.auth };
          jwt.sign(
            payload ,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 60*60*60 },
            (err, token) => {
              if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to generate token' });

              return res.status(201).json({
                status: true,
                message: 'User signup successful',
                token
              });
            })
        })

      })
    })
  });
}

// Login existing users
const login = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }

  // Passed all validations
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve record' });

    if (!user) return res.status(403).json({ status: false, error: 'Account does not exist' });

    // User has account
      bcrypt.compare( password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to compare password' });

        if (!isMatch) return res.status(401).json({ status: false, error: 'Account does not exist' });

        const payload = { id: user._id, auth: user.auth };
          jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 60 * 60 * 60 },
            (err, token) => {
              if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to generate token' });

              return res.status(200).json({
                status: true,
                message: 'User login successful',
                token
              });
            })
      })
  });
}

// Get loggedin users's data by their token
const getUserByToken = (req, res) => {
  const currentUserId = req.authUser.id;
  User.findOne({ _id : currentUserId }, '-password', (err , user) => {
    if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve record' });
    
    if (!user) return res.status(400).json({ status: false, error: 'No such record found' });

    // User found
    return res.status(200).json({
      status: true,
      message: 'User records',
      data: user
    });
  });
}

module.exports = {
  signup,
  login,
  getUserByToken
};