import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import store from './store';
import { loadCurrentUser } from './_actions/authActions';
import Authenticate from './_utils/Authenticate';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Courses from './components/Courses/Courses';
import CourseItem from './components/Courses/CourseItem';
import CategoryList from './components/Category/CategoryList';
import CategoryCourseList from './components/Category/CategoryCourseList';

import Dashboard from './components/Dashboard/Dashboard';
import CategoryItems from './components/Dashboard/CategoryItems';
import CreateCategory from './components/Dashboard/CreateCategory';
import UpdateCategory from './components/Dashboard/UpdateCategory';
import CourseItems from './components/Dashboard/CourseItems';
import UpdateCourse from './components/Dashboard/UpdateCourse';
import LessonItems from './components/Dashboard/LessonItems';
import Users from './components/Dashboard/Users';
import Classroom from './components/Classroom/Classroom';
import ShoppingCart from './components/Cart/ShoppingCart';
import UserCourses from './components/Dashboard/UserCourses';
store.dispatch(loadCurrentUser());
function App() {
  return (
    <Provider store={store}> 
      <Router>
        <Navbar />
        <div className="allow-navabr">
          <Route path='/' exact component={Home} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/login' exact component={Login} />
          <Route path='/courses' exact component={Courses} />
          <Route path='/courses/:courseId' exact component={CourseItem} />
          <Route path='/category' exact component={CategoryList} />
          <Route path='/category/:categoryId' exact component={CategoryCourseList} />
          <Authenticate path='/dashboard' exact component={Dashboard} />
          <Authenticate path='/category-items' exact component={CategoryItems} />
          <Authenticate path='/update-category/:categoryId' exact component={UpdateCategory} />

          <Authenticate path='/active-courses' exact component={UserCourses} />
          <Authenticate path='/course-items' exact component={CourseItems} />
          <Authenticate path='/update-course/:courseId' exact component={UpdateCourse} />
          <Authenticate path='/course-items/:courseId/lessons' exact component={LessonItems} />

          <Authenticate path='/classroom/:courseId/lessons' exact component={Classroom} />
          
          <Authenticate path='/users' exact component={Users} />
          
          <Route path='/cart' exact component={ShoppingCart} />

        </div>
       </Router>
    </Provider>
  );
}

export default App;
