import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const Features = () => {
  return (
    <Fragment>
      <div className="section features">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <div className="line"></div>
          <div className="flex-wrapper">
           
            <div className="card">
              <span className="card-image fa fa-graduation-cap fa-2x"></span>
              <p className="card-title">Upskill</p>
              <div className="card-content">
                No matter what you do, there will always be a course for you. No better time to upskill 
                than now. Sign up and subscribe to courses from excited and passionate instructors.
              </div>
              <div className="card-footer">

              </div>
            </div>

            
            <div className="card">
              <span className="card-image fas fa-award fa-2x"></span>
              <p className="card-title">Get certified</p>
              <div className="card-content">
                Use our widely recognized certificate to document your new skills, share with your friend on 
                social media or negotiate for higher pay with your boss.
              </div>
              <div className="card-footer">

              </div>
            </div>

            
            <div className="card">
              <span className="card-image fas fa-bell fa-2x"></span>
              <p className="card-title">Anytime, Anywhere</p>
              <div className="card-content">
                Your time is yours. Be your own boss. Subscribe to courses that you love and start learning
                at your pace. 
              </div>
              <div className="card-footer">

              </div>
            </div>
          </div>

          <Link to="/signup" className="btn btn-success start-btn"><span className='fa fa-users fa-2x' /> &nbsp; Get started for free</Link>
        </div>
      </div>
    </Fragment>
  );
}
 
export default Features;