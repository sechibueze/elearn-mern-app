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
import Dashboard from './components/Dashboard/Dashboard';
import Courses from './components/Courses/Courses';
import CourseItem from './components/Courses/CourseItem';
store.dispatch(loadCurrentUser());
function App() {
  return (
    <Provider store={store}> 
      <Router>
        <Navbar />
        <Route path='/' exact component={Home} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/login' exact component={Login} />
        <Route path='/courses' exact component={Courses} />
        <Route path='/courses/:courseId' exact component={CourseItem} />
        <Authenticate path='/dashboard' exact component={Dashboard} />
      </Router>
    </Provider>
  );
}

export default App;
