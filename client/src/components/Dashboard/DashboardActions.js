import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const DashboardActions = () => {
  return (
    <Fragment>
      <div className="dashboard-actions">
        <Link to="/create-profile">Create your profile</Link>
        <Link to="/add-course">Add course</Link>
        <Link to="/my-courses">My Courses</Link>
        <Link to="/cart">My Cart</Link>
      </div>
    </Fragment>
  );
}
 
export default DashboardActions;