import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Calendar from '../pages/Calendar';
import AdminHome from '../pages/AdminHome';
import OfficeHours from '../pages/OfficeHours';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import UserHome from '../pages/UserHome';
import EditProfile from '../pages/EditProfile';
import Leaderboard from '../pages/Leaderboard';
import AddUrgentSesh from '../pages/AddUrgentSesh';
import ListNotifications from '../pages/ListNotifications';
import ListStudents from '../pages/ListStudents';
import ListStudentsAdmin from '../pages/ListStudentsAdmin';
import Goals from '../pages/AddGoals';
import ViewGoals from '../pages/ViewGoals';
import ChatSystem from '../pages/chatSystem';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/chat" element={<ChatSystem />} />
          <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/listOH" element={<ProtectedRoute><OfficeHours /></ProtectedRoute>} />
          <Route path="/listStudent" element={<ProtectedRoute><ListStudents /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
          <Route path="/add-urgent-sesh" element={<ProtectedRoute><AddUrgentSesh /></ProtectedRoute>} />
          <Route path="/notification-page" element={<ProtectedRoute><ListNotifications /></ProtectedRoute>} />
          <Route path="/edit/:_id" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/home-page" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
          <Route path="/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/adminStudent" element={<AdminProtectedRoute ready={ready}><ListStudentsAdmin /></AdminProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
          <Route path="/viewgoals" element={<ProtectedRoute><ViewGoals /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute ready={ready}><AdminHome /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
