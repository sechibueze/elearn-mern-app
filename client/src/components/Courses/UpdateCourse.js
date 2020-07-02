import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '../Alert';
import CategoryOptions from '../CategoryOptions';
import { loadCourseById, updateCourse } from '../../_actions/courseActions';

const UpdateCourse = ({
  updateCourseId,
  closeModal,

  loading,
  updateCourse,
  loadCourseById,
  courseInfo,
  updatedCourse

}) => {
  
  useEffect(() => {
    loadCourseById(updateCourseId)
  }, [updateCourseId]);

  useEffect(() => {
    if(updatedCourse !== null) return closeModal();
  }, [updatedCourse]);

  const handleChange = ({ target }) => {
    setCourseData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  };
  const handleUpdateCourse = e => {
    e.preventDefault();
    updateCourse(updateCourseId, courseData)
  };
  const [courseData, setCourseData ] = useState({
    title:  courseInfo !== null ? courseInfo.title : '',
    description: '',
    price: '',
    categoryId: ''
  });
  const { title, description, price } = courseData;
  return (
    <Fragment>
      <form className="form" onSubmit={handleUpdateCourse}>
        <Alert origin='UPDATE_COURSE_ALERT' />
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={handleChange} value={title} className="form-control my-1" id="title" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea name="description" onChange={handleChange} value={description} className="form-control" cols="25" rows="5" id="description" />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" onChange={handleChange} value={price} className="form-control" min="0" id="price" />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Category</label>
          <select name="categoryId"  onChange={handleChange} className="form-control">
            <CategoryOptions />
          </select>
        </div>

        <button type="submit" className="btn btn-success btn-sm fa-plus"> &nbsp; Add </button>
      </form>
    </Fragment>
  );
}
 
// export default UpdateCourse;
UpdateCourse.propTypes = {
  updateCourse: PropTypes.func.isRequired,
  loadCourseById: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  courseInfo: state.courses.courseInfo,
  updatedCourse: state.courses.updatedCourse,
});
export default connect(mapStateToProps, { loadCourseById, updateCourse })(UpdateCourse);
