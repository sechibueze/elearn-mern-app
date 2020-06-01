import React, { Fragment } from 'react';
import Banner from './Banner';
import Features from './Features';
import HomeCTA from './HomeCTA';
import Testimonials from './Testimonials';
import CategoryList from '../Category/CategoryList';

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <Features />
      <CategoryList max='3'/>
      <HomeCTA />
      <Testimonials />
    </Fragment>
  );
}
 
export default Home;