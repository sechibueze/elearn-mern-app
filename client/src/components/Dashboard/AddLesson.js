import React, { Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLesoon } from '../../_actions/courseActions';
const AddLesson = ({ courseId, addLesoon }) => {
  const [lessonData, setLessonData] = useState({
    title: '',
    type: '',
    access: '',
    content: '',
    note: ''
  });
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
    const fd = new FormData();
    console.log('Lesson', lessonData)
    fd.append('title', lessonData.title);
    fd.append('type', lessonData.type);
    fd.append('access', lessonData.access);
    fd.append('content', lessonData.content);
    fd.append('note', lessonData.note); 
    addLesoon(courseId, fd);
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
      <h2 className='text-sub'> Add Lesson </h2>
      <form className="form" onSubmit={handleAddLesson} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={title}
          placeholder='Give this lesson a title'
          className="form-control my-1"
          id="title"
        />

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select name="type" value={type} onChange={handleChange} className="form-control" id="type">
            <option value="video">Video</option>
            <option value="file">File</option>
            <option value="link">Link</option>
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
          {renderContentInput}
        </div>

        <div className="form-group">
          <label htmlFor="note">Note</label>
          <textarea name="note" onChange={handleChange} value={note} className="form-control" cols="25" rows="5" id="note" />
        </div>


        <button type="submit" className="btn btn-success btn-sm fa-plus"> &nbsp; Add </button>

      </form>
    </Fragment>
  );
}
 
AddLesson.propTypes = {
  addLesoon: PropTypes.func.isRequired
};

export default connect(null, { addLesoon })(AddLesson);