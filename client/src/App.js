import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import store from './store';
import { loadCurrentUser } from './_actions/authActions';
import Authenticate from './_utils/Authenticate';

import Home from './components/Home/Home';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ToggleAdminAuth from './components/Auth/ToggleAdminAuth';


import CategoryPage from './components/Category/CategoryPage';
import CategoryCourseItemsPage from './components/Category/CategoryCourseItemsPage';

import CoursesPage from './components/Courses/CoursesPage';
import CourseItemPage from './components/Courses/CourseItemPage';

// Category Manager
import Dashboard from './components/Dashboard/Dashboard';
import CategoryAdmin from './components/Category/CategoryAdmin';

// Courses & Lesson Manger
import CoursesAdmin from './components/Courses/CoursesAdmin';
import LessonManager from './components/Lessons/LessonManager';

import Subscriptions from './components/Dashboard/Subscriptions';
import Classroom from './components/Classroom/Classroom';

import Users from './components/Users/Users';

// import ShoppingCart from './components/Cart/ShoppingCart';
store.dispatch(loadCurrentUser());
const App = ()  => {
  return (
    <Provider store={store}> 
      <Router>
        {/* <Navbar /> */}
        {/* <div className="allow-navabr"> */}
          <Route path='/' exact component={Home} />
          <Route path='/admin' exact component={ToggleAdminAuth} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/login' exact component={Login} />

          <Route path='/category' exact component={CategoryPage} />
          <Route path='/category/:categoryId' exact component={CategoryCourseItemsPage} />

          <Route path='/courses' exact component={CoursesPage} />
          <Route path='/courses/:courseId' exact component={CourseItemPage} />


          <Authenticate path='/browse-courses' exact component={CoursesPage} />
          <Authenticate path='/subscriptions' exact component={Subscriptions} />
          <Authenticate path='/classroom/:courseId/lessons' exact component={Classroom} />

          {/* Teachers and Admin */}
          {/* Dashboard & Category Manager */}
          <Authenticate path='/dashboard' exact component={Dashboard} />
          <Authenticate path='/manage-category' exact component={CategoryAdmin} />
          <Authenticate path='/manage-users' exact component={Users} />

          {/* Courses & Lesson Manager */}
          <Authenticate path='/manage-courses' exact component={CoursesAdmin} />
          <Authenticate path='/manage-lessons/:courseId' exact component={LessonManager} />

          {/*
          <Route path='/cart' exact component={ShoppingCart} /> */}

     
       </Router>
    </Provider>
  );
}

export default App;
