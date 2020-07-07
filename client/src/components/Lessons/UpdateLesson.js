import React, { Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLessonItem, updateLesson } from '../../_actions/courseActions';

import Alert from '../Alert';
const UpdateLesson = ({ 
  loading,
  courseId, 
  lessonId,
  updateLesson, 
  lessonUpdate, 
  lessonItem,
  getLessonItem,
  closeModal 
}) => {
  const [lessonData, setLessonData] = useState({
    title: loading || !lessonItem ? '' : lessonItem.title ,//: '',
    type: '',
    access: '',
    content: '',
    note: ''
  });
 
  useEffect(() => {
    getLessonItem(courseId, lessonId);
  }, []);
  useEffect(() => {
    if(lessonUpdate !== null) closeModal();
  }, [lessonUpdate]);
  const handleChange = ({ target}) => {
    setLessonData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  }
  // const handleSelectedFile = ({ target}) => {
  //   setLessonData(prev => ({
  //     ...prev,
  //     [target.name]:target.files[0]
  //   }))
  // }
  const handleAddLesson = e => {
    e.preventDefault();
    
    updateLesson(courseId, lessonId, lessonData);
  }
  const {title, type, access, content, note } = lessonData;
 
  return (
    <Fragment>
      <form className="form" onSubmit={handleAddLesson} encType="multipart/form-data">
        <Alert origin='UPDATE_LESSON_ALERT' />
        <div className='form-group'>
          <input
          type="text"
          name="title"
          onChange={handleChange}
          value={title}
          placeholder='Give this lesson a title'
          className="form-control my-1"
          id="title"
        />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select name="type" value={type} onChange={handleChange} className="form-control" id="type">
            <option value=""> --- Choose resource type --- </option>
            <option value="yt-video"> YouTube Video Link</option>
            <option value="video-link"> Video Link</option>
            <option value="downloadable"> Downloadable resource </option>
            <option value="image">Image resource </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="access">Access </label>
          <select name="access" value={access} onChange={handleChange} className="form-control" id="access">
            <option value="public">Public</option>
            <option value="private"> Private </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <input 
            type="text"
            name="content" 
            onChange={handleChange} 
            value={content} 
            className="form-control my-1" 
            id="content"
          />
        </div>

        <div className="form-group">
          <label htmlFor="note">Note</label>
          <textarea name="note" onChange={handleChange} value={note} className="form-control" cols="25" rows="5" id="note" />
        </div>


        <button type="submit" className="btn btn-success btn-sm fa-plus"> &nbsp; Update Lesson </button>

      </form>
    </Fragment>
  );
}
 
UpdateLesson.propTypes = {
  updateLesson: PropTypes.func.isRequired,
  getLessonItem: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  lessonUpdate: state.courses.lessonUpdate,
  lessonItem: state.courses.lessonItem,
  loading: state.auth.loading

});
export default connect(mapStateToProps, { getLessonItem,  updateLesson })(UpdateLesson);