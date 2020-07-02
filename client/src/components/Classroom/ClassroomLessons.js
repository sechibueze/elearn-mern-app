import React, { Fragment, useState } from 'react';

const ClassroomLessons = ({ courseInfo }) => {
  
  const [currentLessonUrl, setCurrentLessonUrl] = useState('http://res.cloudinary.com/sechibueze/image/upload/v1590973470/znjpekxghyltx1gllon6.png');
  
  const { _id, title, courseImage, lessons  } = courseInfo;
  return ( 
    <Fragment>
            <div className="classroom-wrapper">
        <header className="header">
          <video className="video-player" controls  alt='video photos fro class' src={currentLessonUrl} />
          <h3 className="bg-dark course-title">
            {  title && title }
          </h3>

          {/* <ul className="classroom-actions">
            <li><a href="/lessons">Lessons</a></li>
            <li><a href="/questions.html">Q&A</a></li>
            <li><a href="/notes.html">Note</a></li>
          </ul> */}
        </header>
        <div className="lesson-playlist">
          {lessons.map((lesson, idx) => (
            <div key={lesson._id} onClick={() => setCurrentLessonUrl(lesson.content.contentUrl)} className="lesson-item" data-lesson={lesson.content.contentUrl}>
              <div className="lesson-item-content">
                <span className="lesson-id"> {++idx} </span>
                <h3 className="lesson-title">
                  { lesson.title }
              </h3>
                {/* <span className="fa fa-check-circle lesson-status"></span> */}
              </div>
            </div>
          ))}

          
        </div>
      </div>
    </Fragment>
   );
}
 
export default ClassroomLessons;