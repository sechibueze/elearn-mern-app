import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CourseCard from '../Courses/CourseCard';
import Loader from '../Loader';
import { loadCategoryCourseList } from '../../_actions/categoryActions';
const CategoryCourseList = ({ match, loadCategoryCourseList, categoryCourseList }) => {
  const categoryId = match.params.categoryId;
  useEffect(() => {
    loadCategoryCourseList(categoryId);
  }, [categoryId]);
  console.log('cat categoryCourseList', categoryCourseList)
  if(!categoryCourseList) return <Loader /> 
  return ( 
    <Fragment>
    
      <div className="section courses">
        <div className="container">
          <h2 className="section-title">
            {categoryCourseList && categoryCourseList.length > 0 ? 
              categoryCourseList[0].categoryId.title :
              'Category'
            } courses
          </h2>
          <div className="line"></div>
          <div className="flex-wrapper course-card-flex-wrapper">
            {categoryCourseList && categoryCourseList.length < 1 ? <h2 className='text-lead'>No course in this category</h2>  : categoryCourseList.map(categoryCourse => (
              <CourseCard key={categoryCourse._id} course={categoryCourse} />
            ))}
          </div>

        </div>
      </div>
    </Fragment>
   );
}
 CategoryCourseList.propTypes = {
   loadCategoryCourseList: PropTypes.func.isRequired
 };

 const mapStateToProps = state => ({
   categoryCourseList: state.category.categoryCourseList
 });
export default connect(mapStateToProps, { loadCategoryCourseList})(CategoryCourseList);