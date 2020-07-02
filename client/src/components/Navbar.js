import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../_actions/authActions';
import { APP_NAME } from '../constants';

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
    </Fragment>
  );
  return (
    <Fragment>
      <nav className="navbar bg-dark clearfix">
        <input type="checkbox" id="navbar-toggler" />
        <div className="container">
          <Link className="logo clearfix" to="/">
            <span className="logo-image fa fa-lightbulb-o fa-2x"></span>
            <span className="logo-name"> { APP_NAME } </span>
          </Link>
          <label htmlFor="navbar-toggler" className="navlinks-toggler fa fa-bars fa-2x"></label>
          <div className="navlinks show">
            <Link to="/courses" className="navlink fa fa-paper-plane"> &nbsp; Courses</Link>
            <Link to="/category" className="navlink fa fa-list-alt"> &nbsp; Category</Link>
            <Link to="/cart" className="navlink fa fa-cart-plus">  &nbsp; Cart <sup> {cartItems && cartItems.length > 0 && cartItems.length} </sup> </Link>
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