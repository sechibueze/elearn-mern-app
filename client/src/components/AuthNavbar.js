import React, { Fragment } from 'react';
 import { Link } from 'react-router-dom';
const AuthNavbar = () => {
  return (
    <Fragment>
      <nav className="auth-navbar">
        <Link to='/dashboard' > <span className='fa fa-backspace' /> &nbsp; Back</Link> 
      </nav>
    </Fragment> 
  );
}
 
export default AuthNavbar;