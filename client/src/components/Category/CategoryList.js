import React, { Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import { loadCategory } from '../../_actions/categoryActions';
const CategoryList = ({max, categoryItems, loadCategory, loading }) => {
  useEffect(() => {
    loadCategory();
  }, []);
  if(!categoryItems) return <Loader />
  const categoryList = max ?  categoryItems.slice(0, max) : categoryItems;
  return (
    <Fragment>
      <div className="section">
        <div className="container">
          <h2 className="section-title">Featured Categories</h2>
          <div className="line"></div>
          <div className="flex-wrapper course-card-flex-wrapper">
            {
              categoryList && categoryList.length > 0 ?
                categoryList.map(category => <CategoryItem key={category._id} category={category} />) :
                <h1 className='text-lead'> No Category yet</h1>
            }
          </div>

        </div>
      </div>
    </Fragment>
  );
}
 CategoryList.propTypes = {
   loadCategory: PropTypes.func.isRequired
 };

 const mapStateToProps = state => ({
   loading: state.auth.loading,
   categoryItems: state.category.categoryItems
 });
export default connect(mapStateToProps, { loadCategory })(CategoryList);