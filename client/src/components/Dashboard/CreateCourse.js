import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';
import { loadCategory } from '../../_actions/categoryActions';
import { createCourse } from '../../_actions/courseActions';
const CreateCourse = ({
  loadCategory,
  categoryItems,
  createCourse
}) => {
  const [courseData, setCourseData] = useState({
    title: '',
    courseImage: '',
    description: '',
    categoryId: '',
    price: ''
  });
  useEffect(() => {
    loadCategory()
  }, []);

  if(!categoryItems) return <Loader />
  const handleChange = ({ target }) => {
    setCourseData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  };
  const handleSelectedFile = ({ target }) => {
    setCourseData(prev => ({
      ...prev,
      [target.name]: target.files[0]
    }));
  }
  const handleCreateCourse = (e) => {
    e.preventDefault();
    console.log('')
    const fd = new FormData();
    fd.append('title', courseData.title);
    fd.append('description', courseData.description);
    fd.append('categoryId', courseData.categoryId);
    fd.append('price', courseData.price);
    fd.append('courseImage', courseData.courseImage);
    createCourse(fd);
  };
  const {title, description, categoryId, price } = courseData;
  return ( 
    <Fragment>
      <Link className='my-1' to='/dashboard'>Back </Link>
      <form className="form" onSubmit={ handleCreateCourse } encType="multipart/form-data">
        <h2 className='text-sub'>Create a new Course</h2>
        
        <div className="form-group">
          <label htmlFor="title">Course title</label>
          <input type="text" name="title" onChange={handleChange} value={title} placeholder='Give your course a title' className="form-control my-1" id="title" />
        </div>
        <div className="form-group">
          <label htmlFor="course_image">Course Image</label>
          <input type="file" name="courseImage" onChange={handleSelectedFile} className="form-control my-1" id="course_image" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea name="description" onChange={handleChange} value={description} placeholder='Add a brief decription' className="form-control" cols="25" rows="5" id="description"/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" onChange={handleChange} value={ price }  className="form-control" min="0" id="price" />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Category</label>
          <select name="categoryId" value={categoryId}  onChange={handleChange} className="form-control">
            { categoryItems.map(category => (
              <option key={category._id} value={ category._id}> { category.title } </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success my-1 btn-sm fa-plus"> &nbsp; Add Course </button>
        
      </form>
    </Fragment>
  );
}
 CreateCourse.propTypes = {
   loadCategory: PropTypes.func.isRequired,
   createCourse: PropTypes.func.isRequired
 };
const mapStateToProps = state => ({
  categoryItems: state.category.categoryItems
});
export default connect(mapStateToProps, { loadCategory, createCourse })(CreateCourse);
