import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleAdminAuth } from '../../_actions/authActions';
// import { setAlert } from '../../_actions/alertActions';
import Alert from '../Alert';
import Navbar from '../Navbar';
const ToggleAdminAuth = ({ toggleAdminAuth }) => {
  const [data, setData] = useState({ email: ''});

  const handleChange = ({target}) => {
    setData(prevState => ({ ...prevState, [target.name]: target.value }))
  };
  const handleToggleAdminAuth = e => { 
    e.preventDefault();
    toggleAdminAuth(data)
  };

 const { email } = data;
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <form className="form" onSubmit={handleToggleAdminAuth} name="login-form" id="login-form">
          
          <h2 className="text-lead fa fa-key">&nbsp; Manage Admin Roles</h2>
          <p className="text-sub"></p>
          <sup>*</sup> means Required

          <Alert origin="TOGGLE_ADMIN_AUTH" type="success"/>
          <Alert origin="TOGGLE_ADMIN_AUTH_ERROR"/>

          <div className="form-group">
            <label htmlFor="email">Email<sup>*</sup></label>
            <input type="email" name="email" value={email} onChange={handleChange}
            className="form-control" id="email" placeholder="jsmith@js.com" />

          </div>



          <button type="submit" id="login-btn" className="btn btn-primary btn-md fa fa-check"> &nbsp; Update </button>

       
        </form>
      </div>
    </Fragment>
  );
}
ToggleAdminAuth.prppTypes = {
  toggleAdminAuth: PropTypes.func.isRequired
};
//  const mapStateToProps = state => ({
//    isAuthenticated: state.auth.isAuthenticated
//  })
export default connect(null , { toggleAdminAuth })(ToggleAdminAuth);