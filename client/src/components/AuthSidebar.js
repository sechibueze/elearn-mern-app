import React, { Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../_actions/authActions';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';

const AuthSidebar = ({ 
  logout,
  currentUser
 }) => {
  
  return (
    <Fragment>
      <aside className="auth-sidebar">
        <label htmlFor="auth-sidebar-control" className="auth-sidebar-close fa fa-close" />
        <header className="sidebar-header">
          <Link to='/'>
            <span className="sidebar-icon fa fa-lightbulb-o" />
            <span className="sidebar-name"> { APP_NAME} </span>
          </Link>
        </header>
        <ul className="sidebar-actions">
          <li>
            <Link to='/browse-courses' className="auth-sidebar-link"> <span className="fa fa-clock" /> Courses</Link>
          </li>
          <li>
            <Link to='/subscriptions' className="auth-sidebar-link"> <span className="fa fa-hourglass" /> Subscriptions</Link>
          </li>

          {
            currentUser && currentUser.auth.includes('teacher') && (
              <li>
                <Link to='/manage-courses' className="auth-sidebar-link" > <span className="fa fa-graduation-cap" /> Course Manager </Link>
              </li>
            )
          }

          {
            currentUser && currentUser.auth.includes('admin') && (
              <Fragment>
                <li>
                  <Link to='/manage-category' className="auth-sidebar-link"> <span className="fa fa-tags" /> Category</Link>
                </li>
                <li>
                  <Link to='/manage-users' className="auth-sidebar-link" > <span className="fa fa-users" /> User Manager </Link>
                </li>
              </Fragment>
            )
          }
                 
          <li>
            <span onClick={() => logout()} className="auth-sidebar-link"> <span className="fa fa-sign-out" /> Logout</span>           
          </li>
          
        </ul>
      </aside>
    </Fragment>
  );
}
 
AuthSidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
 const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    currentUser: state.auth.currentUser
 });
export default connect(mapStateToProps, { logout })(AuthSidebar);
