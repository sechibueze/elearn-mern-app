import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { addCourseToCart } from  '../../_actions/cartAction';
import {Link} from 'react-router-dom';
const CourseCard = ({ course, addCourseToCart }) => {
  const {_id, title, courseImage, description, price, categoryId} = course;
  let productItem = { courseId: _id, title, price };
  // const addCourseToCart = product => {
  //   console.log('Product to cart', product);
  //   addCourseToCart(product)
  // };
  return (
    <Fragment>
      <div className="card course-card">
        <img src={courseImage.courseImageUrl} alt='product of course' className="card-image" />
        <p className="card-title"> { title && title} </p>
        <div className="card-content">
          { description && description }
        </div>
        <div className="card-footer">
          <span> Category:  { categoryId.title } </span>
          <h3 className='text-sub'> <sup>N</sup> {price === 'free' ? 0 : price } </h3>
          <div className="course-card-cta">
            <span onClick={() => addCourseToCart(productItem)} className="fa fa-cart-plus add2cart-btn btn-primary"> &nbsp; Add to cart</span>
            <Link to={`/courses/${_id}`} className="fa fa-user buynow-btn btn-dark"> &nbsp; View Course</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 CourseCard.propTypes = {
   addCourseToCart: PropTypes.func.isRequired
 }

 const mapStateToProps = state => ({
   currentUser: state.auth.currentUser
 })
export default connect(mapStateToProps , { addCourseToCart })(CourseCard);