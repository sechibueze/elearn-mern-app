import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import { loadCategoryById, updateCategory } from '../../_actions/categoryActions';

const UpdateCategory = ({ history, match , loadCategoryById, categoryById, updateCategory, updatedCategory}) => {
  const categoryId = match.params.categoryId;
  useEffect(() => {
    loadCategoryById(categoryId)
  }, [categoryId]);


  const [categoryData, setCategoryData] = useState({
    title: '', //categoryId === null ? '' : categoryById.title,
    category_image: '',
    description: '' // categoryId === null ? '' : categoryById.description
  });

  if (!categoryById) return <Loader />

  
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
    // console.log('upd cat fd', fd.get(''))
    // console.log('upd cat  va', fd.valu())
    updateCategory(categoryId, fd, history);
  };
 
  const {title, description } = categoryData;
  return (
    <Fragment>
      <h1> Update category </h1>
      <form className="form" onSubmit={handleUpdateCategory} encType="multipart/form-data">
        <button type="submit" className="btn btn-success btn-sm fa-plus"> &nbsp; Add </button>
        <Link to="/category-items" className="btn btn-primary">Cancel</Link>
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
      </form>
    </Fragment>
  );
}
 


UpdateCategory.propTypes = {
  loadCategoryById: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired

};
const mapStateToProps = state => ({
  categoryById: state.category.categoryById,
  updatedCategory: state.category.updateCategory
});
export default connect(mapStateToProps, { loadCategoryById, updateCategory })(withRouter(UpdateCategory));