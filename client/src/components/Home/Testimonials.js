import React, { Fragment } from 'react';

const Testimonials = () => {
  return (
    <Fragment>
      <div className="section testimonials bg-dark">
        <h2 className="section-title">Top industries trust us</h2>
        <div className="line"></div>
        <div className="container">
          <div className="credit ">
            <img className="person" src="/img/person_1.jpg" alt='Testifying for eLearn' />
            <div className="message">
              <article>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ullam itaque a nam laboriosam pariatur unde asperiores
                fuga at dolorum ad.
                Ullam itaque a nam laboriosam pariatur unde asperiores
                fuga at dolorum ad.
              </article>
              <span className="source">Julian Megbour</span>
              <small className="position">CEO, Indian Company</small>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 
export default Testimonials;