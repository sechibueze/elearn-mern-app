import React, { Fragment } from 'react';
import Banner from './Banner';
import Features from './Features';
import HomeCTA from './HomeCTA';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <Features />
      <HomeCTA />
      <Testimonials />
    </Fragment>
  );
}
 
export default Home;