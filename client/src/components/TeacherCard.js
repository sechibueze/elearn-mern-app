import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const TeacherCard = ({ teacher }) => {
  const { _id, name, avartar } = teacher;
  return ( 
    <Fragment>
      <div className="course-owner credit">
        <img className="person" src={ avartar && avartar} alt={`${ name } - image`} />
        <div className="message">
          { name && name }
          <Link className="btn btn-success btn-block btn-sm" to={`/profiles/${_id}`}> View Profile</Link>
        </div>
      </div>
    </Fragment>
   );
}
 
export default TeacherCard;