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
          { description && description.slice(0, 100) }
        </div>
        <div className="card-footer">         
          <div className="course-card-cta">
            <Link to={`/category/${ _id }`}> Browse courses</Link>  
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 
export default CategoryItem;