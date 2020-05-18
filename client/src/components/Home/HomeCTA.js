import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const HomeCTA = () => {
  return (
    <Fragment>
      <div className="home-cta">
        <div className="clip">
         
          <div className="grid-wrapper home-cta-grid">
              <img src="/img/learning.jpg" alt='Learning never ends' />
              <div className="home-cta-content">
                <p className="text-lead">Get in demand skills to stand out</p>
                <article className="my-1 pr-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
                  accusamus pariatur vero et rem qui? adipisicing elit. Quae,
                  accusamus pariatur vero et rem qui?
                </article>
                <Link to="/courses" className="btn btn-primary fa fa-search"> &nbsp; Browse courses</Link>
              </div>
            </div>
            
          </div>
        </div>
    </Fragment>
  );
}
 
export default HomeCTA;