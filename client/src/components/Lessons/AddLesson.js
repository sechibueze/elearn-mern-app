import React, { Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLesoon } from '../../_actions/courseActions';

import Alert from '../Alert';
const AddLesson = ({ courseId, addLesoon, newLesson, closeModal }) => {
  const [lessonData, setLessonData] = useState({
    title: '',
    type: '',
    access: '',
    content: '',
    note: ''
  });
  useEffect(() => {
    if(newLesson !== null) closeModal();
  }, [newLesson]);
  const handleChange = ({ target}) => {
    setLessonData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  }
  const handleSelectedFile = ({ target}) => {
    setLessonData(prev => ({
      ...prev,
      [target.name]:target.files[0]
    }))
  }
  const handleAddLesson = e => {
    e.preventDefault();
    // const fd = new FormData();
    // fd.append('title', lessonData.title);
    // fd.append('type', lessonData.type);
    // fd.append('access', lessonData.access);
    // fd.append('content', lessonData.content);
    // fd.append('note', lessonData.note); 
    addLesoon(courseId, lessonData);
  }
  const {title, type, access, content, note } = lessonData;
  const textInput = (
    <input 
      type="text"
      name="content" 
      onChange={handleChange} 
      value={content} 
      className="form-control my-1" 
      id="content"
    />);
  const fileInput = (
    <input 
      type="file"
      name="content" 
      onChange={handleSelectedFile} 
      className="form-control my-1" 
      id="content"
    />);
  const renderContentInput = lessonData.type === 'file' ? 
    (fileInput) :
    (textInput);
  
  return (
    <Fragment>
      <form className="form" onSubmit={handleAddLesson} encType="multipart/form-data">
        <Alert origin='ADD_LESSON_ALERT' />
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


        <button type="submit" className="btn btn-success btn-sm fa-plus"> &nbsp; Add Lesson </button>

      </form>
    </Fragment>
  );
}
 
AddLesson.propTypes = {
  addLesoon: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  newLesson: state.courses.newLesson
});
export default connect(mapStateToProps, { addLesoon })(AddLesson);