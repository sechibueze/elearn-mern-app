import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { subscribeUserToCourse, unsubscribeUserToCourse } from  '../../_actions/courseActions';
import {isEnrolled } from '../functions';
import { Link } from 'react-router-dom';
import TeacherCard from '../TeacherCard';
const ShowCourseInfo = ({ 
  courseInfo,

  isAuthenticated,
  currentUser,

  subscribeUserToCourse,
  unsubscribeUserToCourse
}) => {
  const handleSubscription = (courseId) => {
    if (isEnrolled(subscriptions, currentUser._id)) {
      unsubscribeUserToCourse(courseId)
    }else{
      subscribeUserToCourse(courseId)
    }
  }
  const {_id, title, userId, courseImage,  description, price, categoryId, lessons, subscriptions } = courseInfo;

  return (  
    <Fragment>
      <div className="container">
        <div className="course-item">
          <div className="course-intro">
            <img className="video-player" alt={`${ title } media`} src={ courseImage && courseImage.courseImageUrl } />
          </div>

          {
            isAuthenticated && isEnrolled(subscriptions, currentUser._id) && (
              <Link to={`/classroom/${_id}/lessons`} className="fa fa-user btn btn-primary btn-md btn-block"> &nbsp; Classroom </Link>              
            )             
          } 

          {
            isAuthenticated && !isEnrolled(subscriptions, currentUser._id) && (

              <span onClick={() => handleSubscription(_id)} className="btn btn-primary btn-md btn-block"> <span className="fa fa-cart-plus" /> { isEnrolled(subscriptions, currentUser._id) ? 'Unsubscribe' : 'Subscribe'}  </span>
            )
          }
        
          {
            !isAuthenticated && (
               <Link to={`/login`} className="btn btn-primary btn-md btn-block"> Login to start learning </Link>
            )
          }
          
       
          
          <div className="course-overview card">
            <h3 className="card-title"> { title && title} </h3>
            <article className="card-content">
              { description }
            </article>
          </div>
          <div className="course-data card">
            <span title='Number of learners' className="fa fa-users">&nbsp; { subscriptions && subscriptions.length } </span>
            <span title='Number of lesson contents' className="fa fa-graduation-cap">&nbsp; { lessons && lessons.length} </span>
            <span title='Course categories' className="fa fa-tags">&nbsp; { categoryId && categoryId.title } </span>
          </div>

          <TeacherCard teacher={userId} />
        </div>
      </div>

    </Fragment>
  );
}
 
 ShowCourseInfo.propTypes = {
  //  addCourseToCart: PropTypes.func.isRequired,
   subscribeUserToCourse: PropTypes.func.isRequired,
   unsubscribeUserToCourse: PropTypes.func.isRequired
 }

 const mapStateToProps = state => ({
   currentUser: state.auth.currentUser,
   isAuthenticated: state.auth.isAuthenticated
 })
export default connect(mapStateToProps , { subscribeUserToCourse, unsubscribeUserToCourse })(ShowCourseInfo);
