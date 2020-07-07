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
      <div className="card">
        <img src={courseImage.courseImageUrl} alt={`${ title } visual`} className="card-image" />
        <p className="card-title"> { title && title} </p>
        <div className="card-content">
          { description && description.slice(0, 100) }
        </div>
          <h3 className='text-sub'> <sup>N</sup> {price === 'free' ? 0 : price } </h3>
        <div className='card-meta'>
          <span className="fa fa-tags">  { categoryId.title } </span>

        </div>
        <div className="card-footer">
         
            {
              isAuthenticated ? (                
                <Fragment>
                  <span onClick={() => handleSubscription(_id)} className="card-cta btn-primary"> <span className="fas fa-book-reader" /> { isEnrolled(subscriptions, currentUser._id) ? 'Unsubscribe' : 'Subscribe'}  </span>
                </Fragment>

              ) : null
              }

            <Link to={`/courses/${_id}`} className="fa fa-eye card-cta btn-dark"> &nbsp; View Course</Link>
            {
              isAuthenticated && isEnrolled(subscriptions, currentUser._id) && (
                
                <Link to={`/classroom/${_id}/lessons`} className="fas fa-chalkboard-teacher card-cta btn-dark"> &nbsp; Classroom </Link>
              )
            }
            
          {/* </div> */}
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