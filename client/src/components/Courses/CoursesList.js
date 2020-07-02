import React, { Fragment,  useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCourses, clearCourseData, deleteCourse, toggleCourseVisibility } from '../../_actions/courseActions';
import Loader from '../Loader';
import Modal from '../Modal';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import CourseInfo from './CourseInfo';
const CoursesList = ({ 
  list,
  clearCourseData,

  deleteCourse,
  toggleCourseVisibility
  
 }) => {

  const [createCourseModalVisibility, setCreateCourseModalVisibility] = useState(false);
  const [courseUpdateVisibility, setCourseUpdateVisibility] = useState({
    isOpen: null,
    updateCourseId: null
  });
  const [courseInfoVisibility, setCourseInfoVisibility] = useState({
    isVisible: null,
    courseInfoId: null
  });

  
  const showCourseInfo = courseId => {
    setCourseInfoVisibility({
      isVisible: true,
      courseInfoId: courseId
    })
  }
  // const toggleCourseVisibility = courseId => {}
  const handleCourseUpdate = courseId => {
    setCourseUpdateVisibility({
      isOpen: true,
      updateCourseId: courseId
    });
    
  }
  const handleDeleteCourse = courseId => {
    if (window.confirm('Irreversible !!! Are you sure ? ')) {
      deleteCourse(courseId)
    }
  }
  const handleModalClose = () => {
      clearCourseData();
      setCreateCourseModalVisibility(false)
      setCourseUpdateVisibility({
        isOpen: null,
        updateCourseId: null
      })
      setCourseInfoVisibility({
        isVisible: null,
        courseInfoId: null
      })
  }
  const { isOpen, updateCourseId } = courseUpdateVisibility;
  const { isVisible, courseInfoId } = courseInfoVisibility;
  return (
    <Fragment>
      {
        createCourseModalVisibility && (
          <Modal title='Create Course' isOpen={createCourseModalVisibility} closeModal={() => handleModalClose()}>
            <CreateCourse closeModal={() => handleModalClose()} />
          </Modal>
        )
      }
      {
        isOpen && updateCourseId && (
          <Modal title='Update Course' isOpen={isOpen}  closeModal={() => handleModalClose()} >
            <UpdateCourse updateCourseId={updateCourseId} closeModal={() => handleModalClose()} />
          </Modal>
        )
      }
      {
        isVisible && courseInfoId && (
          <Modal title='Course Info' isOpen={isVisible}  closeModal={() => handleModalClose()} >
            <CourseInfo courseInfoId={courseInfoId}  />
          </Modal>
        )
      }
      <div className="auth-action">
        <span className="fa fa-plus" onClick={() => setCreateCourseModalVisibility(true)}>  Create Course</span>
      </div>
      {
        list.length > 0 && (
          <table className="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>View</th>
                  <th> Manage Lessons </th>
                  <th>Course Title</th>
                  <th>Course Description</th>
                  <th>Course Creator</th>
                  <th>Course Category</th>
                  <th>Course Lessons</th>
                  <th>Course Subs</th>
                  <th>Course Price</th>
                  <th> Visibility </th>
                  <th>Edit Course</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {
                  list.map((course, idx) => (
                    <tr key={course._id}>
                      <td> {`${++idx}`} </td>
                      <td> <span onClick={() => showCourseInfo(course._id)} className='fa fa-eye'/></td>
                      <td> <Link to={`/manage-lessons/${course._id}`} className="fa fa-edit" />  </td>
                      <td> {course.title} </td>
                      <td> {course.description.slice(0, 25)} </td>
                      <td> {course.userId.name} </td>
                      <td> {course.categoryId.title} </td>
                      <td> {course.lessons.length} </td>
                      <td> {course.subscriptions.length} </td>
                      <td> {course.price === 'free' ? 0 : course.price} </td>
                      <td> <span onClick={() => toggleCourseVisibility(course._id)}> {course.published ? 'Unpublish' : 'Publish'} </span> </td>
                      <td> <span onClick={() => handleCourseUpdate(course._id)} className="fa fa-edit" />  </td>
                      <td> <span onClick={() => handleDeleteCourse(course._id)} className="fa fa-close" /> </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        ) 
      }


    </Fragment>
  );
}
CoursesList.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  clearCourseData: PropTypes.func.isRequired,
  toggleCourseVisibility: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired

}
 const mapStateToProps = state => ({
   loading: state.auth.loading,
   newCourse: state.courses.newCourse,


   currentTeacher: state.auth.currentUser,
   userCourses: state.courses.userCourses,

   updatedCourse: state.courses.updatedCourse,
   deletedCourse: state.courses.deletedCourse,
   courseVisibilityStatus: state.courses.courseVisibilityStatus

 });
export default connect(mapStateToProps, { loadCourses, clearCourseData, deleteCourse, toggleCourseVisibility })(CoursesList);