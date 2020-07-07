import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../constants';
const Banner = () => {
  return (
    <Fragment>
      <div className='banner'>
        <div className="overlay">
          <div className="banner-content">
            <h1 className="text-lead"> { APP_NAME} </h1>
            <p className="text-sub">
              We believe that learning should be fun and meaningful. Okanmuta - maximized learning is an e-learning solution that connects educators to their 
              learners. Students gain impressive skills through expert-led demonstrations, open
              discussions and hands-on projects to stand out. Okanmuta is changing the way educators and learners collaborate 
              to achieve success.
            </p>
          </div>
          <div className="banner-action-buttons">
            <Link to="/signup" className="btn btn-primary fa fa-users"> &nbsp; Signup</Link>
            <Link to="/login" className="btn btn-success fa fa-sign-in-alt">&nbsp; Login</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 
export default Banner;