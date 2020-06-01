import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';
import { loadCourses, deleteCourse, toggleCourseVisibility } from '../../_actions/courseActions';
import CreateCourse from './CreateCourse';
const CourseItems = ({ 
  loading, currentTeacher, loadCourses, userCourses,
  newCourse, updatedCourse, deletedCourse, deleteCourse,
  toggleCourseVisibility, courseVisibilityStatus
 }) => {

  const [adminStatus, setAdminStatus] = useState(false);

  useEffect(() => {
    let filter = !adminStatus ? {
      userId: currentTeacher.id
    } : null;

    loadCourses(filter);
  }, [newCourse, updatedCourse, adminStatus, deletedCourse, courseVisibilityStatus])

  if(!userCourses) return <Loader />
  console.log('adminStatus', adminStatus)
  // if(userCourses.length < 1) return <h1 className='text-lead'>No Course yet, Add one</h1>
  const handleDeleteCourse = courseId => {
    if (window.confirm('Are you sure ? ' + courseId)) {
      deleteCourse(courseId)
    }
  }
  return (
    <Fragment>
      
      <div className="container">
        <CreateCourse />

        {
          currentTeacher.auth.includes('admin') ? 
          (
              <Fragment>
                <label htmlFor='setAdminStatus'><h2> View as Admin </h2></label>
                <input type='checkbox' onClick={() =>  setAdminStatus(!adminStatus)} id='setAdminStatus' />
              </Fragment>
          ) : 
          (
            <h2 className="text-sub"> 
              {currentTeacher && `${currentTeacher.name}'s Course`}
            </h2>
          )
        }
        
        <table className="table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>View</th>
              <th>Course Title</th>
              <th>Course Description</th>
              <th>Course Creator</th>
              <th>Course Category</th>
              <th>Course Lessons</th>
              <th>Course Subs</th>
              <th>Course Price</th>
              <th> Visibility </th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              userCourses.map((course, idx) => (
                <tr key={idx}>
                  <td> {`${++idx}`} </td>
                  <td> <Link to={`/course-items/${course._id}/lessons`} className='fa fa-eye'/></td>
                  <td> {course.title} </td>
                  <td> {course.description.slice(0, 25)} </td>
                  <td> {course.userId.name} </td>
                  <td> {course.categoryId.title} </td>
                  <td> {course.lessons.length} </td>
                  <td> {course.subscriptions.length} </td>
                  <td> {course.price === 'free' ? 0 : course.price} </td>
                  <td> <span onClick={() => toggleCourseVisibility(course._id)}> {course.published ? 'Unpublish' : 'Publish'} </span> </td>
                  <td> <Link to={`/update-course/${course._id}`} className="fa fa-edit" />  </td>
                  <td> <span onClick={() => handleDeleteCourse(course._id)} className="fa fa-close" /> </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </Fragment>
  );
}
CourseItems.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  toggleCourseVisibility: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  userCourses: PropTypes.array
};
 const mapStateToProps = state => ({
   loading: state.auth.loading,
   currentTeacher: state.auth.currentUser,
   userCourses: state.courses.userCourses,

   newCourse: state.courses.newCourse,
   updatedCourse: state.courses.updatedCourse,
   deletedCourse: state.courses.deletedCourse,
   courseVisibilityStatus: state.courses.courseVisibilityStatus

 });
export default connect(mapStateToProps, { loadCourses, deleteCourse, toggleCourseVisibility })(CourseItems);