import React, { Fragment } from 'react';

const LessonItemData = ({
  lessonItem
}) => {
  const {_id, title, note, content, type, access } = lessonItem;
  return (
    <Fragment>
      <h2> { title && title } </h2>
      {
        content && (<img src={content.contentUrl} alt={content.publicId}/>)
      }
      <span> { access && access } - {type && type } </span>
      <article> { note && note } </article>
    </Fragment>
   );
}
 
export default LessonItemData;