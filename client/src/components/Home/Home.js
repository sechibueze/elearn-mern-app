import React, { Fragment } from 'react';
import Navbar from '../Navbar';
import Wrapper from '../Wrapper';
import Banner from './Banner';
import Features from './Features';
import HomeCTA from './HomeCTA';
import Testimonials from './Testimonials';
import CategoryItems from '../CategoryItems';

const Home = () => {
  return (
    <Fragment>
      <Navbar />
     
        <Banner />
        <Features />
        <CategoryItems max='3'/>
        <HomeCTA />
        <Testimonials />
      
    </Fragment>
  );
}
 
export default Home;