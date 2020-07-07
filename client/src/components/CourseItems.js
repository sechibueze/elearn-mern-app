import React, { Fragment } from 'react';

import CourseCard from './CourseCard';

const CourseItems = ({coursesList, sectionTitle }) => {

  return (
    <Fragment>
      <div className="container">
        {/* <input className="search-input" name="item" placeholder="Search courses..." /> */}
      </div>
      {
        coursesList.length === 0 ? (
          <Fragment>
            <h2 className="text-lead"> No course yet</h2>
          </Fragment>
        ) : (
           <div className="section courses">
              <div className="container">
                <h2 className="section-title"> { sectionTitle ? sectionTitle : "Recommended Courses"} </h2>
                <div className="line"></div>
                <div className="flex-wrapper course-card-flex-wrapper">
                  {
                    coursesList.map(course => <CourseCard key={course._id} course={course} />) 
                  }          
                </div>

              </div>
            </div>
        )
      }

     
    </Fragment>
  );
}

export default CourseItems;