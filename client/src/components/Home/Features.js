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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id facere laboriosam quis dolore assumenda
                ipsum quos, fugit similique, optio repellendus ut eum aut minus corrupti praesentium facilis odit nemo.

              </div>
              <div className="card-footer">

              </div>
            </div>

            
            <div className="card">
              <span className="card-image fa fa-check-circle fa-2x"></span>
              <p className="card-title">Get certified</p>
              <div className="card-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id facere laboriosam quis dolore assumenda
                ipsum quos, fugit similique, optio repellendus ut eum aut minus corrupti praesentium facilis odit nemo.

              </div>
              <div className="card-footer">

              </div>
            </div>

            
            <div className="card">
              <span className="card-image fa fa-gear fa-2x"></span>
              <p className="card-title">Anytime, Anywhere</p>
              <div className="card-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id facere laboriosam quis dolore assumenda
                ipsum quos, fugit similique, optio repellendus ut eum aut minus corrupti praesentium facilis odit nemo.

              </div>
              <div className="card-footer">

              </div>
            </div>
          </div>

          <Link to="/signup" className="btn btn-success start-btn fa fa-users fa-2x"> &nbsp; Get started for free</Link>
        </div>
      </div>
    </Fragment>
  );
}
 
export default Features;