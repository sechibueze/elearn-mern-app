import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import Alert from '../Alert';
import { loadCategoryById, updateCategory } from '../../_actions/categoryActions';

const UpdateCategory = ({
  categoryId,
  closeModal,

  loadCategoryById, 
  updateCategory,

  loading,
  categoryById, 
  updatedCategory
}) => {

    const [categoryData, setCategoryData] = useState({
      title:  loading && categoryById !== null ? categoryById.title : '', 
      category_image: '',
      description: loading && categoryById !== null ? categoryById.description : ''
    });
    
  useEffect(() => {
    loadCategoryById(categoryId)
  }, [categoryId]);

  useEffect(() => {
    if(updatedCategory !==  null) return closeModal();
  }, [updatedCategory]);

  if (loading && !categoryById) return <Loader />

  
  const handleChange = ({ target }) => {
    setCategoryData(prev => ({
      ...prev,
      [target.name]: target.value
    }));
  };

  const handleSelectedFile = ({ target }) => {
    setCategoryData(prev => ({
      ...prev,
      [target.name]: target.files[0]
    }));
  }
  const handleUpdateCategory = (e) => {
    e.preventDefault()
    const fd = new FormData();
    for (const key in categoryData) {
      if (categoryData.hasOwnProperty(key)) {
        fd.append(key, categoryData[key]);
      }
    }
    updateCategory(categoryId, fd);
  };
 
  const {title, description } = categoryData;
  return (
    <Fragment>
      
      <form className="form" onSubmit={handleUpdateCategory} encType="multipart/form-data">
        <Alert origin='CATEGORY_ALERT' />
        <div className="form-group">
          {/* <img src={ categoryId.image.imageurl} alt='category data ' /> */}
          <label htmlFor="category_image">Category Image</label>
          <input type="file" name="category_image" onChange={handleSelectedFile} className="form-control my-1" id="category_image" />
        </div>

        <div className="form-group">
          <label htmlFor="title">Category title</label>
          <input type="text" name="title" onChange={handleChange} value={ title } className="form-control my-1" id="title" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea name="description" onChange={handleChange} value={description}  className="form-control" cols="25" rows="5" id="description" />
        </div>

        <button type="submit" className="btn btn-success btn-sm fa-plus"> &nbsp; Add </button>
  
      </form>
    </Fragment>
  );
}
 


UpdateCategory.propTypes = {
  loadCategoryById: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  categoryById: state.category.categoryById,
  updatedCategory: state.category.updateCategory,
});
export default connect(mapStateToProps, { loadCategoryById, updateCategory })(UpdateCategory);