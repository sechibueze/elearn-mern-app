import React, { Fragment } from 'react';
import CourseInfo from './CourseInfo';
import Navbar from '../Navbar';

const CourseItemPage = ({ match }) => {
  const { courseId } = match.params;

  return ( 
    <Fragment>
      <Navbar />
      <CourseInfo courseInfoId={courseId} />
    </Fragment>
   );
}
 
export default CourseItemPage;