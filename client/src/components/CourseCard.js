import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { addCourseToCart } from  '../_actions/cartAction';
import { subscribeUserToCourse, unsubscribeUserToCourse } from  '../_actions/courseActions';
import { isEnrolled } from './functions';
import {Link} from 'react-router-dom';
const CourseCard = ({ course, isAuthenticated, currentUser, subscribeUserToCourse, unsubscribeUserToCourse, addCourseToCart }) => {
  const {_id, title, courseImage, description, price, categoryId, subscriptions } = course;
  let productItem = { courseId: _id, title, price };

  const handleSubscription = (courseId) => {
    if (isEnrolled(subscriptions, currentUser._id)) {
      unsubscribeUserToCourse(courseId)
    }else{
      subscribeUserToCourse(courseId)
    }
  }
  return (
    <Fragment>
      <div className="card course-card">
        <img src={courseImage.courseImageUrl} alt={`${ title } visual`} className="card-image" />
        <p className="card-title"> { title && title} </p>
        <div className="card-content">
          { description && description }
        </div>
        <div className="card-footer">
          <span className="fa fa-tags">  { categoryId.title } </span>
          <h3 className='text-sub'> <sup>N</sup> {price === 'free' ? 0 : price } </h3>
          <div className="course-card-cta">
            {/* <span onClick={() => addCourseToCart(productItem)} className="add2cart-btn btn-primary"> <span className="fa fa-cart-plus" /> Add to cart </span> */}
            
            {
              isAuthenticated ? (                
                <Fragment>
                  <span onClick={() => handleSubscription(_id)} className="add2cart-btn btn-primary"> <span className="fa fa-cart-plus" /> { isEnrolled(subscriptions, currentUser._id) ? 'Unsubscribe' : 'Subscribe'}  </span>
                </Fragment>

              ) : (
                
                <Link to={`/courses/${_id}`} className="fa fa-eye buynow-btn btn-dark"> &nbsp; View Course</Link>
              )
            }
            {
              isAuthenticated && isEnrolled(subscriptions, currentUser._id) && (
                
                <Link to={`/classroom/${_id}/lessons`} className="fa fa-user buynow-btn btn-dark"> &nbsp; Classroom </Link>
              )
            }
            
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 CourseCard.propTypes = {
   addCourseToCart: PropTypes.func.isRequired,
   subscribeUserToCourse: PropTypes.func.isRequired,
   unsubscribeUserToCourse: PropTypes.func.isRequired
 }

 const mapStateToProps = state => ({
   currentUser: state.auth.currentUser,
   isAuthenticated: state.auth.isAuthenticated
 })
export default connect(mapStateToProps , { subscribeUserToCourse, unsubscribeUserToCourse, addCourseToCart })(CourseCard);