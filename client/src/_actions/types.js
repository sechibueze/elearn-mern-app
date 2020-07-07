// http://localhost:3000/manage-category
export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://okanmuta.herokuapp.com' : 'http://localhost:8000';
export const SET_ALERT = 'SET_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';
export const LOADING = 'LOADING';
export const LOADED = 'LOADED';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const LOGOUT = 'LOGOUT';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export const LOAD_USERS = 'LOAD_USERS';
export const MANAGE_USER_AUTH = 'MANAGE_USER_AUTH';
// export const TOGGLE_ADMIN_AUTH = 'TOGGLE_ADMIN_AUTH';
// export const BECOME_TEACHER = 'BECOME_TEACHER';
// export const REMOVE_TEACHER = 'REMOVE_TEACHER';

// Cart
export const ADD_CART = 'ADD_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

// Lessons
export const ADD_LESSON = 'ADD_LESSON';
export const GET_LESSON = 'GET_LESSON';

export const CLEAR_LESSON_DATA = 'CLEAR_LESSON_DATA';
export const UPDATE_LESSON = 'UPDATE_LESSON';
export const DELETE_LESSON = 'DELETE_LESSON';
// Courses
export const CREATE_COURSE = 'CREATE_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const LOAD_COURSES = 'LOAD_COURSES';
export const CLEAR_COURSE_DATA = 'CLEAR_COURSE_DATA';
export const LOAD_COURSE_INFO = 'LOAD_COURSE_INFO';

export const TOGGLE_COURSE_VISIBILITY = 'TOGGLE_COURSE_VISIBILITY';
export const LOAD_COURSE_SUBSCRIPTIONS = 'LOAD_COURSE_SUBSCRIPTIONS';
export const SUBSCRIBE = 'SUBSCRIBE';
export const UNSUBSCRIBE = 'UNSUBSCRIBE';

// Categories
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const LOAD_CATEGORY = 'LOAD_CATEGORY';
export const GET_CATEGORY_BY_ID = 'GET_CATEGORY_BY_ID';
export const LOAD_CATEGORY_COURSELIST = 'LOAD_CATEGORY_COURSELIST';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const CLEAR_CATEGORY_DATA = 'CLEAR_CATEGORY_DATA';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

