import React, { Fragment, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import { loadCategory, deleteCategory } from '../../_actions/categoryActions';
import CreateCategory from './CreateCategory';

const CategoryItems = ({ 
  loading, newCategory, updateCategory, 
  deletedCategory, loadCategory, categoryItems,
  deleteCategory
}) => {
 
  useEffect(() => {
    loadCategory();
  }, [newCategory, updateCategory, deletedCategory]);
  const handleDeleteCategory = id => {
    if (window.confirm('Are you sure')) {
      deleteCategory(id)
    }
  };
  
  if(!categoryItems) return <Loader />

  return (
    <Fragment>
      <div className="container">
        <Link to='/dashboard' className='fa fa-backspace'>Back</Link>
       <CreateCategory /> 
        <table className="table mt-1">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Category Image</th>
              <th>Category Title</th>
              <th>Category Description</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              categoryItems.map((items, idx) => (
                <tr key={idx}>
                  <td> {`${++idx}`} </td>
                  <td> <img src={items.image.imageUrl} alt='cat imag' /> </td>
                  <td> {items.title} </td>
                  <td> {items.description} </td>
                  <td> <Link to={`/update-category/${items._id}`} className="fa fa-edit" />  </td>
                  <td> <span onClick={() => handleDeleteCategory(items._id)} class="fa fa-close" /> </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
CategoryItems.propTypes = {
  loadCategory: PropTypes.func.isRequired
};
 const mapStateToProps = state => ({
   categoryItems: state.category.categoryItems,
   newCategory: state.category.newCategory,
   updateCategory: state.category.updateCategory,
   deletedCategory: state.category.deleteCategory
 });
export default connect(mapStateToProps, { loadCategory, deleteCategory })(CategoryItems);