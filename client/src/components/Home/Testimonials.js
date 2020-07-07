import React, { Fragment } from 'react';

const Testimonials = () => {
  return (
    <Fragment>
      <div className="section testimonials bg-dark">
        <h2 className="section-title">Top achievers trust us</h2>
        <div className="line"></div>
        <div className="container">
          <div className="credit ">
            <img className="person" src="/img/person_1.jpg" alt='Testifying for eLearn' />
            <div className="message">
              <article>
                I and my team use Okanmuta to stay updated on what is important and changing in my
                profession. The courses are insightful, fun and right-on-point. 
              </article>
              <span className="source">Julian Mentabour</span>
              <small className="position">CEO, Mendanworks </small>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 
export default Testimonials;