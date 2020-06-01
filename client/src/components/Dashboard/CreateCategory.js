import React, { useState, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createCategory } from '../../_actions/categoryActions';
const CreateCategory = ({ createCategory }) => {
  const [categoryData, setCategoryData ] = useState({});
  const handleChange = ({ target }) => {
    setCategoryData(prev => ({
      ...prev,
      [target.name]:target.value
    }));
  };

  const handleSelectedFile = ({ target}) => {
    setCategoryData(prev => ({
      ...prev,
      [target.name]: target.files[0]
    }));
  }
  const handleCreateCategory = (e) => {
    e.preventDefault()
    const fd = new FormData();
    fd.append('title', categoryData.title);
    fd.append('description', categoryData.description);
    fd.append('category_image', categoryData.category_image);
    createCategory(fd);
  };
  return (
    <Fragment>
      <h1> Create a new category </h1>
      <form className="form" onSubmit={handleCreateCategory} encType="multipart/form-data">
        
        <div className="form-group">
          <label htmlFor="category_image">Category Image</label>
          <input type="file" name="category_image" onChange={handleSelectedFile} className="form-control my-1" id="category_image" />
        </div>

        <div className="form-group">
          <label htmlFor="title">Category title</label>
          <input type="text" name="title" onChange={handleChange} placeholder='Give this category a title' className="form-control my-1" id="title"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea name="description" onChange={handleChange} placeholder='A short description of this category' className="form-control" cols="25" rows="5" id="description" />
        </div>

        <button type="submit" className="btn btn-success mb-1 btn-sm fa-plus"> &nbsp; Create Category </button>

      </form>
    </Fragment>
  );
}
CreateCategory.propTypes = {
  createCategory: PropTypes.func.isRequired
};
 const mapStateToProps = state => ({
  newCategory: state.category.newCategory
 });
export default connect(mapStateToProps, { createCategory })(CreateCategory);