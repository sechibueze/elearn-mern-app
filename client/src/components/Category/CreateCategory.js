import React, { useState, useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';

import { createCategory } from '../../_actions/categoryActions';
const CreateCategory = ({ createCategory, newCategory, closeModal }) => {
  const [categoryData, setCategoryData ] = useState({
    title: "",
    description: "",
    category_image: ""
  });
  useEffect(() => {
    if(newCategory !== null) closeModal()
  }, [newCategory])
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
    // console.log('New Category Info', categoryData)
    createCategory(fd);
  };
  const {title, description, category_image } = categoryData;
  return (
    <Fragment>
      
      <form className="form" onSubmit={handleCreateCategory} encType="multipart/form-data">
        <Alert origin="CREATE_CATEGORY_ALERT" />
        <div className="form-group">
          <label htmlFor="category_image">Category Image</label>
          <input type="file" name="category_image" onChange={handleSelectedFile} className="form-control my-1" id="category_image" />
        </div>

        <div className="form-group">
          <label htmlFor="title">Category title</label>
          <input type="text" name="title" value={title} onChange={handleChange} placeholder='Give this category a title' className="form-control my-1" id="title"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea name="description" value={description} onChange={handleChange} placeholder='A short description of this category' className="form-control" cols="25" rows="5" id="description" />
        </div>

        <button type="submit" className="btn btn-success mb-1 btn-sm"> <span className='fa fa-plus' />  &nbsp; Create Category </button>

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