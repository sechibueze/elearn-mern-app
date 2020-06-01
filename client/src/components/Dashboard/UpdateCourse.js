import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';
import { loadCategory } from '../../_actions/categoryActions';
import { loadCourseById, updateCourse } from '../../_actions/courseActions';

const UpdateCourse = ({
  match,
  history,
  loadCategory,
  loadCourseById,
  currentCourse,
  updateCourse,
  categoryItems
}) => {
  const courseId = match.params.courseId;
  const [courseData, setCourseData ] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: ''
  });
  useEffect(() => {
    loadCategory();
    loadCourseById(courseId)
  }, [courseId]);

  const handleChange = ({ target }) => {
    setCourseData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  };
  const handleUpdateCourse = e => {
    e.preventDefault();
    console.log('update courseData::', courseData);
    updateCourse(courseId, courseData, history)
  };
  const { title, description, categoryId, price } = courseData;
  console.log('upd courseData::b4 return', courseData)
  if(!categoryItems || !courseData) return <Loader />
  return (
    <Fragment>
      <form className="form" onSubmit={handleUpdateCourse}>
        <button type="submit" className="btn btn-success btn-sm fa-plus"> &nbsp; Add </button>
        <button className="btn btn-primary p-1">Publish</button>
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
            {categoryItems && categoryItems.map(category => (
              <option key={category._id} selected={ currentCourse && (category._id === currentCourse.categoryId._id) ? true : false} value={category._id}> {category.title} </option>
            ))}
          </select>
        </div>

      </form>
    </Fragment>
  );
}
 
// export default UpdateCourse;
UpdateCourse.propTypes = {
  loadCategory: PropTypes.func.isRequired,
  updateCourse: PropTypes.func.isRequired,
  loadCourseById: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  categoryItems: state.category.categoryItems,
  currentCourse: state.courses.currentCourse
});
export default connect(mapStateToProps, { loadCategory,loadCourseById, updateCourse })(UpdateCourse);
