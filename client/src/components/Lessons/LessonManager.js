import React, { Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourseById, clearLessonData, removeLessonItem } from '../../_actions/courseActions';

import AuthContainer from '../AuthContainer';
import Alert from '../Alert';
import Modal from '../Modal';
import Loader from '../Loader';
import AddLesson from './AddLesson';
import UpdateLesson from './UpdateLesson';
import PreviewLesson from './PreviewLesson';

const LessonManager = ({
  match,
  loading,
  loadCourseById,
  courseInfo,

  clearLessonData,
  removeLessonItem,

  newLesson,
  lessonUpdate,
  lessonDelete

}) => {
  const {courseId} = match.params;
  const [addLessonVisibility, setAddLessonVisibility] = useState(false);
  const [updateLessonVisibility, setUpdateLessonVisibility] = useState({
    canUpdate: null,
    courseId: null,
    lessonId: null
  });

  const [previewLessonVisibility, setPreviewLessonVisibility] = useState({
    canPreview: null,
    courseId: null,
    previewLessonId: null
  });

  useEffect(() => {
    loadCourseById(courseId)
  }, [courseId, newLesson, lessonUpdate, lessonDelete]);
  const handleLessonUpdate = (lessonId) => {
    setUpdateLessonVisibility(prev => ({
      ...prev,
      canUpdate: true,
      courseId: courseId,
      lessonId: lessonId
    }))
  }
  const handleLessonPreview = (lessonId) => {
    setPreviewLessonVisibility(prev => ({
      ...prev,
      canPreview: true,
      courseId: courseId,
      previewLessonId: lessonId
    }))
  }
  const closeLessonCreation = () => {
    clearLessonData();
    setAddLessonVisibility(false)
  }
  const closeLessonUpdate = () => {
    clearLessonData();
    setUpdateLessonVisibility(prev => ({
      ...prev,
      canUpdate: null,
      courseId: null,
      lessonId: null
    }))
  }
  const closeLessonPreview = () => {
    clearLessonData();
    setPreviewLessonVisibility(prev => ({
      ...prev,
      canPreview: null,
      courseId: null,
      previewLessonId: null
    }))
  }
  const deleteLesson = lessonId => {
    if (window.confirm('Are you sure')) {
      removeLessonItem(courseId, lessonId);
    }
  }
  if(loading && !courseInfo) return <Loader />

  const { canUpdate, lessonId } = updateLessonVisibility;
  const { canPreview, previewLessonId } = previewLessonVisibility;
  return (  
    <Fragment>
      <AuthContainer>
        <h1> Lesson Manager   </h1>
        {
          addLessonVisibility && (
            <Modal title='Ádd Lesson' isOpen={addLessonVisibility} closeModal={() => closeLessonCreation()}>
              <AddLesson courseId={courseId} closeModal={() => closeLessonCreation()} />
            </Modal>
          )
        }
        {
          canUpdate && lessonId && (
            <Modal title='Update Lesson' isOpen={canUpdate} closeModal={() => closeLessonUpdate()}>
              <UpdateLesson courseId={courseId} lessonId={lessonId} closeModal={() => closeLessonUpdate()} />
            </Modal>
          )
        }
        {
          canPreview && previewLessonId && (
            <Modal title='Preview Lesson' isOpen={canPreview} closeModal={() => closeLessonPreview()}>
              <PreviewLesson courseId={courseId} lessonId={previewLessonId} closeModal={() => closeLessonPreview()} />
            </Modal>
          )
        }
        <div className="auth-action">
          <span className="fa fa-plus" onClick={() => setAddLessonVisibility(true)}>  Add Lesson</span>
        </div>
        <Alert origin='ADD_LESSON_SUCCESS' type='success'/>
        <Alert origin='UPDATE_LESSON_SUCCESS'  type='success'/>
        <Alert origin='DELETE_LESSON_SUCCESS'  type='success'/>
        <Alert origin='DELETE_LESSON_ALERT' />
        {
          courseInfo && courseInfo.lessons.length > 0  && (
            <table className="table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>View</th>
                    <th>Lesson Title</th>
                    <th>Lesson Note</th>
                    <th>Lesson Type</th>
                    <th>Lesson Access</th>
                    <th>Edit</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  courseInfo.lessons.map((lesson, idx) => (
                    <tr key={lesson._id}>
                      <td> {++idx} </td>
                      <td> <span onClick={() => handleLessonPreview(lesson._id)} className='fa fa-eye'/> </td>
                      <td> {lesson.title} </td>
                      <td> {lesson.note} </td>
                      <td> {lesson.type} </td>
                      <td> {lesson.access} </td>              
                      <td> <span onClick={() => handleLessonUpdate(lesson._id)} className="fa fa-edit" /> </td>
                      <td> <span onClick={() => deleteLesson(lesson._id)} className="fa fa-close" /> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          )
        }

      </AuthContainer>

    </Fragment>
  );
}
 
LessonManager.propTypes = {
  loadCourseById: PropTypes.func.isRequired,
  removeLessonItem: PropTypes.func.isRequired,
  clearLessonData: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  courseInfo: state.courses.courseInfo,
  newLesson: state.courses.newLesson,
  lessonUpdate: state.courses.lessonUpdate,
  lessonDelete: state.courses.lessonDelete
});
export default connect(mapStateToProps, { loadCourseById, clearLessonData, removeLessonItem })(LessonManager);
