import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignIn from '../components/signin';
import SignUp from '../components/signup';
import NavBar from '../components/navbar';
import ManagerProjects from '../components/manager/projects';
import TestersOfProject from '../components/manager/testers';
import TesterProjects from '../components/tester/projects';
import TesterProjectDashboard from '../components/tester/testerProjectDashboard';
import Analytics from '../components/manager/analytics';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={NavBar} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />

        <Route path="/manager/projects" exact component={ManagerProjects} />
        <Route path="/project/:id/testers" exact component={TestersOfProject} />

        <Route path="/tester/projects" exact component={TesterProjects} />
        <Route path="/project/:id/dashboard" exact component={TesterProjectDashboard} />
        <Route path="/analytics" exact component={Analytics} />
      </div>
    );
  }
}

export default Routes;
