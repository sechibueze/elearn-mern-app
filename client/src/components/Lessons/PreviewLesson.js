import React, { Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLessonItem } from '../../_actions/courseActions';
import Loader from '../Loader';
import LessonItemData from './LessonItemData';
const PreviewLesson = ({
  loading,
  courseId,
  lessonId,
  getLessonItem,
  lessonItem
}) => {
  useEffect(() => {
    getLessonItem(courseId, lessonId);
  }, []);

  if(loading && !lessonItem) return <Loader title='Fetching preview...'/>

  return ( 
    <Fragment>
      {
        lessonItem && ( <LessonItemData lessonItem={lessonItem} /> )
      }
    </Fragment>
  );
}

PreviewLesson.propTypes = {
  getLessonItem: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  lessonItem: state.courses.lessonItem
});
export default connect(mapStateToProps, { getLessonItem })(PreviewLesson);