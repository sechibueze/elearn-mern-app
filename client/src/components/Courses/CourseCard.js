import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
const CourseCard = ({ course }) => {
  const {_id, title, description, price, categoryId} = course;
  return (
    <Fragment>
      <div className="card course-card">
        <img src="/img/products/automan.png" alt='product of course' className="card-image" />
        <p className="card-title"> { title && title} </p>
        <div className="card-content">
          { description && description }
        </div>
        <div className="card-footer">
          <span> Category:  { categoryId.title } </span>
          <h3 className='text-sub'> <sup>N</sup> {price === 'free' ? 0 : price } </h3>
          <div className="course-card-cta">
            <a href="/add-item.html" className="fa fa-cart-plus add2cart-btn btn-primary"> &nbsp; Add to cart</a>
            <Link to={`/courses/${_id}`} className="fa fa-user buynow-btn btn-dark"> &nbsp; View Course</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 
export default CourseCard;