import React, { Fragment } from 'react';

const LessonItemData = ({
  lessonItem
}) => {
  const {_id, title, note, content, type, access } = lessonItem;
  return (
    <Fragment>
      <h2> { title && title } </h2>
      {
        content && (
          <iframe width="561" height="150" src={content} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        ) 

        
      }
      <span> { access && access } - {type && type } </span>
      <article> { note && note } </article>
    </Fragment>
   );
}
 
export default LessonItemData;