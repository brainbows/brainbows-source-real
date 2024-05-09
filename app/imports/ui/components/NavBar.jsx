import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Bell, BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <h2>Brainbows</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id="home-nav" as={NavLink} to="/home-page" key="home-page">Home</Nav.Link>,
              <Nav.Link id="calendar-nav" as={NavLink} to="/calendar" key="calendar">Calendar</Nav.Link>,
              <Nav.Link id="leaderboard-nav" as={NavLink} to="/leaderboard" key="leaderboard">Leaderboard</Nav.Link>,
              <Nav.Link id="list-OfficeHours-nav" as={NavLink} to="/list-office-hours" key="list">Office Hours</Nav.Link>,
              <Nav.Link id="goals-nav" as={NavLink} to="/goals" key="goals">Goals</Nav.Link>,
              <Nav.Link id="viewgoals-nav" as={NavLink} to="/viewgoals" key="viewgoals">View Goals</Nav.Link>,
              <Nav.Link id="list-office-hours-nav" as={NavLink} to="/list-office-hours" key="list">Office Hours</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-students-admin-nav" as={NavLink} to="/adminStudent" key="admin">Admin</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser ? (
              <Nav.Link id="notification-nav" as={NavLink} to="/notification-page" key="notification"><Bell /></Nav.Link>
            ) : ''}
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
