import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../../_actions/authActions';
import { setAlert } from '../../_actions/alertActions';
import Alert from '../Alert';
const Signup = ({loading, isAuthenticated, signup, setAlert }) => {
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = ({ target}) => {
    setUserData({ ...userData, [target.name]: target.value });
    
  }

  const handleSignup = e => {
    e.preventDefault();
    const {name, email, password} = userData;
    console.log('user', userData)
    if (!name || !email || !password) {
      return setAlert('All fields are required', 'SIGNUP_FAIL');
    }
    if (userData.password !== userData.confirm_password) {
      return setAlert('Passwords must match', 'SIGNUP_FAIL');
    }
    signup(userData);
  };
  if(isAuthenticated) return <Redirect to='/dashboard' />

  const { name, email, password, confirm_password } = userData;
  return (
    <Fragment>
      <div className="container">
        <form className="form" onSubmit={handleSignup} name="signup-form" id="signup-form">
          <h2 className="text-lead fa fa-users">&nbsp; Signup</h2>
          <p className="text-sub">Join our community of passionate learners</p>
          <sup>*</sup> means Required
          {loading && <h2>Loading...</h2>}
          <Alert filter='SIGNUP_FAIL'/>
          <div className="form-group">
            <label htmlFor="name">Name<sup>*</sup></label>
            <input type="text" onChange={handleChange} name="name" value={name} className="form-control" id="name" placeholder="John Smith" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email<sup>*</sup></label>
            <input type="email" name="email" onChange={handleChange}  value={email} className="form-control" id="email" placeholder="jsmith@js.com" />
            <small>If you want Gravatar, use an associated email account</small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password<sup>*</sup></label>
            <input type="password" name="password" onChange={handleChange} value={password} className="form-control" id="password"
              placeholder="minimun of 8 characters" />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password<sup>*</sup></label>
            <input type="password" name="confirm_password" onChange={handleChange}  value={confirm_password} className="form-control" id="confirm_password"
              placeholder="Confirm password" />
          </div>

          <button type="submit" id="signup-btn" className="btn btn-primary fa fa-user"> &nbsp; Signup </button>

          <p className="my-2">Already has an account? <Link to="/login">Login</Link> </p>
        </form>
      </div>
    </Fragment>
  );
}
Signup.propsTypes = {
  signup: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
 const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated,
   loading: state.auth.loading
 });
export default connect(mapStateToProps, { signup, setAlert })(Signup);