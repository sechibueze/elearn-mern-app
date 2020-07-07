import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import Navbar from '../Navbar';
import CourseItems from '../CourseItems';
import { loadCategoryCourseList } from '../../_actions/categoryActions';
const CategoryCourseList = ({ match, subscribe, unsubscribe, loading, loadCategoryCourseList, categoryCourseList }) => {
  const {categoryId} = match.params;
  useEffect(() => {
    loadCategoryCourseList(categoryId);
  }, [categoryId, subscribe, unsubscribe]);

  if(loading && categoryCourseList.length === 0) return <Loader /> 
  return ( 
    <Fragment>
      <Navbar />  
      {
        categoryCourseList.length === 0 ? (
          <h2> No course in category</h2>
        ) : (
          <CourseItems coursesList={categoryCourseList} sectionTitle="In this category..."/>
        )
      }
    </Fragment>
   );
}
 CategoryCourseList.propTypes = {
   loadCategoryCourseList: PropTypes.func.isRequired
 };

 const mapStateToProps = state => ({
   categoryCourseList: state.category.categoryCourseList,
   loading: state.auth.loading,
   subscriptions: state.courses.subscriptions,
    subscribe: state.courses.subscribe,
    unsubscribe: state.courses.unsubscribe
 });
export default connect(mapStateToProps, { loadCategoryCourseList})(CategoryCourseList);