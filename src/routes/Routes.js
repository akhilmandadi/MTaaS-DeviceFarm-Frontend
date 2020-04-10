import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignIn from '../components/signin';
import SignUp from '../components/signup';
import NavBar from '../components/navbar';
import ManagerProjects from '../components/manager/projects';
import TestersOfProject from '../components/manager/testers';
import TesterProjects from '../components/tester/projects';
import TesterProjectDashboard from '../components/tester/testerProjectDashboard';
<<<<<<< HEAD
import Analytics from '../components/manager/analytics';
=======
import TesterOnDemandAllocation from '../components/tester/OnDemandAllocations';
import ShowTests from '../components/tester/ShowTests';
import CreateTest from '../components/tester/CreateTest';
>>>>>>> added device management section

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={NavBar}/>
        <Route path="/signin" component={SignIn} exact/>
        <Route path="/signup" component={SignUp} exact/>

        <Route path="/manager/projects" exact component={ManagerProjects} />
        <Route path="/project/:id/testers" exact component={TestersOfProject} />

        <Route path="/tester/projects" exact component={TesterProjects} exact/>
        <Route path="/project/:id/dashboard" exact component={TesterProjectDashboard} />
<<<<<<< HEAD
        <Route path="/analytics" exact component={Analytics} />
=======
        <Route path="/tester/:testerId/project/:projectId/ondemand_allocations" exact component={TesterOnDemandAllocation} />
        <Route path="/tester/:testerId/project/:projectId/allocation/:allocationId/tests" exact component={ShowTests} />
        <Route path="/tester/:testerId/project/:projectId/allocation/:allocationId/tests/create" exact component={CreateTest} />
>>>>>>> added device management section
      </div>
    );
  }
}

export default Routes;
