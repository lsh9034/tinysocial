import About from './pages/about';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Emailvalidation from './pages/emailvalidation';
import Error from './pages/error';
import Eventdetail from './pages/eventdetail';
import EventList from './pages/eventlist';
import Landing from './pages/landing';
import NavBar from './components/navigation/navbar';
import React from 'react';
import SignInUp from './pages/signInUp';
import SignOut from './pages/signout';
import UserPage from './pages/userpage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/about'
          render={() => <div><NavBar/><About/></div>}/>
        <Route path="/emailvalidation"
          render={() => <div><NavBar/><Emailvalidation/></div>}/>
        <Route path='/error'
          render={() => <div><NavBar/><Error/></div>}/>
        <Route path='/eventdetail'
          render={() => <div><NavBar/><Eventdetail/></div>}/>
        <Route path='/eventlist'
          render={() => <div><NavBar/><EventList/></div>}/>
        <Route path='/signin'
          render={() => <div><NavBar/><SignInUp/></div>}/>
        <Route path='/signout'
          render={() => <div><NavBar/><SignOut/></div>}/>
        <Route path='/userpage'
          render={() => <div><NavBar/><UserPage/></div>}/>
        <Route path='/'
          render={() => <div><NavBar/><Landing/></div>}/>
      </Switch>
    </Router>
  );
}

export default App;
