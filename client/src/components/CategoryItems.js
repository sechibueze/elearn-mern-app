import React, { Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryCard';
import { loadCategory } from '../_actions/categoryActions';

const CategoryItems = ({max, sectionTitle, categoryItems, loadCategory, loading }) => {
  useEffect(() => {
    loadCategory();
  }, []);

  if(loading && categoryItems.length === 0) return <Loader />
  const categoryList = max ?  categoryItems.slice(0, max) : categoryItems;
  return (
    <Fragment>
      {
        categoryList.length === 0 ? (null
          // <Fragment>
          //   <h2 className="text-lead"> No category yet</h2>
          // </Fragment>
        ) :(
          <div className="section">
            <div className="container">
              <h2 className="section-title"> { sectionTitle ? sectionTitle : "Featured Categories"} </h2>
              <div className="line"></div>
              <div className="flex-wrapper course-card-flex-wrapper">
                {
                  categoryList.map(category => <CategoryItem key={category._id} category={category} />)
                }
              </div>

            </div>
          </div>
        )
      }
      
    </Fragment>
  );
}
 CategoryItems.propTypes = {
   loadCategory: PropTypes.func.isRequired
 };

 const mapStateToProps = state => ({
   loading: state.auth.loading,
   categoryItems: state.category.categoryItems
 });
export default connect(mapStateToProps, { loadCategory })(CategoryItems);