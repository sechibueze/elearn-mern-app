import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../_actions/authActions';
window.addEventListener('resize', e => {
  // console.log('resise', e)
  console.log('resise', e.target.innerWidth)
})
const Navbar = ({ logout, isAuthenticated, cartItems }) => {
  const guestLink = (
    <Fragment>
      <Link to="/signup" className="navlink fa fa-users"> &nbsp; Signup</Link>
      <Link to="/login" className="navlink fa fa-sign-in"> &nbsp; Login</Link>
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <Link to="/dashboard" className="navlink fa fa-dashboard"> &nbsp; Dashboard</Link>
      <span onClick={() => logout()} className="navlink fa fa-sign-out"> &nbsp; Logout</span>
    </Fragment>
  );
  return (
    <Fragment>
      <nav className="navbar bg-dark clearfix">
        <div className="container">
          <Link className="logo clearfix" to="/">
            <span className="logo-image fa fa-lightbulb-o fa-2x"></span>
            <span className="logo-name">eLearn</span>
          </Link>
          <span className="navlinks-toggler fa fa-bars fa-2x"></span>
          <div className="navlinks show">
            <Link to="/courses" className="navlink">Courses</Link>
            <Link to="/category" className="navlink">Category</Link>
            <Link to="/cart" className="navlink">  Cart <sup> {cartItems && cartItems.length > 0 && cartItems.length} </sup> </Link>

            {isAuthenticated ? authLinks : guestLink }
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
 const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    cartItems: state.cart.items
 });
export default connect(mapStateToProps, { logout })(Navbar);