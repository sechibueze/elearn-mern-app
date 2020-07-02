import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import AuthContainer from '../AuthContainer';
import Modal from '../Modal';
import Alert from '../Alert';

import CreateCategory from './CreateCategory';
import { loadCategory } from '../../_actions/categoryActions';
import ShowCategory from './ShowCategory';
const CategoryAdmin = ({
  loading,
  loadCategory,
  categoryItems,
  newCategory,
  updateCategory,
  deleteCategory
}) => {
  const [createModalVisibility, setCreateModalVisibility] = useState(false)
  useEffect(() => {
    loadCategory()
  }, [newCategory, updateCategory, deleteCategory])

  if(loading && categoryItems.length === 0) return <Loader />
  
  return ( 
    <AuthContainer>
      <Fragment>
        <Alert origin="CREATE_CATEGORY" type="success"/>
        <Alert origin="UPDATE_CATEGORY_SUCCESS" type="success"/>
        <Alert origin="DELETE_CATEGORY_SUCCESS" type="success"/>
        <Alert origin="DELETE_CATEGORY_ALERT" type="danger"/>
        
        <Modal isOpen={createModalVisibility} title="Create Category" closeModal={() => setCreateModalVisibility(false)}>
          <CreateCategory closeModal={() => setCreateModalVisibility(false)} />
        </Modal>

        {
          categoryItems.length === 0 ? (
            <Fragment >
              <div className="container">
                <h3> No Category, Add one </h3>
                <div className="auth-action">
                  <span className="fa fa-plus" onClick={() => setCreateModalVisibility(true)}>  Create Category</span>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>

                <div className="auth-action">
                  <span className="fa fa-plus" onClick={() => setCreateModalVisibility(true)}>  Create Category</span>
                </div>
              <ShowCategory categoryItems={categoryItems} />
            </Fragment>
          )
        }
      </Fragment>
    
    </AuthContainer>
   );
}
 
 CategoryAdmin.propTypes = {
   loadCategory: PropTypes.func.isRequired
 };

 const mapStateToProps = state => ({
   loading: state.auth.loading,
   categoryItems: state.category.categoryItems,
   newCategory: state.category.newCategory,
   updateCategory: state.category.updateCategory,
   deleteCategory: state.category.deleteCategory
 });
export default connect(mapStateToProps, { loadCategory})(CategoryAdmin);
