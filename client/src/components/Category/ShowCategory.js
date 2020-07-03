import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import Modal from '../Modal';
import UpdateCategory from './UpdateCategory';
import { deleteCategory, clearCategoryData } from '../../_actions/categoryActions';
const ShowCategory = ({ 
  categoryItems,
  clearCategoryData,
  deleteCategory
  
}) => {
  const [updateCategoryVisibility, setUpdateCategoryVisibility] = useState({
    categoryId: null,
    visibility: null
  });

  const handleDeleteCategory = categoryId => {
    if (window.confirm('Irreversible!! Are you sure ?')) {
      deleteCategory(categoryId)
    }
  }
  const showCategoryForUpdate = categoryId => {
    setUpdateCategoryVisibility(prev => ({
      ...prev,
      categoryId: categoryId,
      visibility: true
    }))
  }
  const hideCategoryForUpdate = () => {
    clearCategoryData();
    setUpdateCategoryVisibility(prev => ({
      ...prev,
      categoryId: null,
      visibility: null
    }))
  }
  const { categoryId, visibility } = updateCategoryVisibility;
  return ( 
    <Fragment>
      {
        visibility && categoryId ? (

          <Modal isOpen={visibility} title='Update Category' closeModal={() => hideCategoryForUpdate()}>
            <UpdateCategory categoryId={categoryId} closeModal={() => hideCategoryForUpdate()}/>
          </Modal>
        ) : null
      }
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
                  <td> <img className='table-image' src={items.image.imageUrl} alt='cat imag' /> </td>
                  <td> {items.title} </td>
                  <td> {items.description} </td>
                  <td> <span className="fa fa-edit" onClick={() => showCategoryForUpdate(items._id)} />  </td>
                  <td> <span onClick={() => handleDeleteCategory(items._id)} class="fa fa-close" /> </td>
                </tr>
              ))
            }
          </tbody>
        </table>
    </Fragment>
   );
}
 
ShowCategory.propTypes = {
  clearCategoryData: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired
};
 
export default connect(null, { deleteCategory, clearCategoryData })(ShowCategory);
