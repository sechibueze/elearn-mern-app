import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const Banner = () => {
  return (
    <Fragment>
      <div className='banner'>
        <div className="overlay">
          <div className="banner-content">
            <h1 className="text-lead">eLearn</h1>
            <p className="text-sub">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio maxime minima, quae blanditiis saepe
              officiis temporibus non. Quas exercitationem excepturi assumenda non ducimus repellat officiis ad vel unde
              itaque

        </p>
          </div>
          <div className="banner-action-buttons">
            <Link to="/signup" className="btn btn-primary fa fa-user"> &nbsp; Signup</Link>
            <Link to="/login" className="btn btn-success fa fa-sign-in">&nbsp; Login</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 
export default Banner;