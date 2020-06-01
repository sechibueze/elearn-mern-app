import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const CategoryItem = ({category}) => {
  
  const { _id, title, description, image } = category;
  return (
    <Fragment>
      <div className="card course-card">
        <img src={image.imageUrl} className="card-image" alt={`${ image.publicId }`}/>
        <p className="card-title"> {title} </p>
        <div className="card-content">
          { description }
        </div>
        <div className="card-footer">
          <div className="price">
            {/* <span className="price-figure"> <sup>N</sup> 1200</span>
            <span className="price-sale"> <sup>N</sup> 2000</span> */}
          </div>
          <div className="course-card-cta">
            <Link to={`/category/${ _id }`}> Browse courses</Link>
            
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 
export default CategoryItem;