import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../_actions/authActions';
import { setAlert } from '../../_actions/alertActions';
import Alert from '../Alert';
import Navbar from '../Navbar';
const Login = ({ login, setAlert, isAuthenticated }) => {
  const [userData, setUserData] = useState({ email: '', password: ''});

  const handleChange = ({target}) => {
    setUserData(prevState => ({ ...prevState, [target.name]: target.value }))
  };
  const handleLogin = e => { 
    e.preventDefault();
    const {email, password} = userData;
    if(!email) return setAlert('Email is required', 'LOGIN_ALERT')
    if(!password) return setAlert('Password is required', 'LOGIN_FAIL')

    login(userData);
  };

  if(isAuthenticated) return <Redirect to='/dashboard' />

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <form className="form" onSubmit={handleLogin} name="login-form" id="login-form">
          
          <h2 className="text-lead"> <span className='fa fa-sign-in-alt' />  &nbsp; Login</h2>
          <p className="text-sub">Login to see what others are learning</p>
          <sup>*</sup> means Required

          <Alert origin='LOGIN_ALERT'/>
          <div className="form-group">
            <label htmlFor="email">Email<sup>*</sup></label>
            <input type="email" name="email" onChange={handleChange}
            className="form-control" id="email" placeholder="jsmith@js.com" />

          </div>

          <div className="form-group">
            <label htmlFor="password">Password<sup>*</sup></label>
            <input type="password" name="password" onChange={handleChange} className="form-control" id="password"
              placeholder="minimun of 8 characters" />
          </div>



          <button type="submit" id="login-btn" className="btn btn-primary btn-md "> <span className='fa fa-sign-in-alt' />  &nbsp; Login </button>

          <p className="my-2">Don't have an account? <Link to="/signup">Signup</Link> </p>
        </form>
      </div>
    </Fragment>
  );
}
Login.prppTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
 const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
 })
export default connect(mapStateToProps, { login, setAlert })(Login);