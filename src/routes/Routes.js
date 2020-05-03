import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignIn from '../components/signin';
import SignUp from '../components/signup';
import NavBar from '../components/navbar';
import ManagerProjects from '../components/manager/projects';
import ManagerBilling from '../components/manager/billing';
import TestersOfProject from '../components/manager/testers';
import TesterProjects from '../components/tester/projects';
import TesterProjectDashboard from '../components/tester/testerProjectDashboard';
import Analytics from '../components/manager/analytics';
import TesterOnDemandAllocation from '../components/tester/OnDemandAllocations';
import ShowTests from '../components/tester/ShowTests';
import CreateTest from '../components/tester/CreateTest';
import ManagerProjectDashboard from '../components/manager/projectDashboard';
import Bugs from '../components/tester/bugs';
import AdminProjects from '../components/admin/projects';
import AdminUsers from '../components/admin/users';
import CreateRun from '../components/tester/CreateRun';
import ViewTests from '../components/tester/tests';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={NavBar} />
        <Route path="/signin" component={SignIn} exact />
        <Route path="/signup" component={SignUp} exact />

        <Route path="/manager/projects" exact component={ManagerProjects} />
        <Route path="/manager/billing" exact component={ManagerBilling} />
        <Route path="/project/:id/testers" exact component={TestersOfProject} />

        <Route path="/tester/projects" exact component={TesterProjects} exact />
        <Route path="/project/:id/dashboard" exact component={TesterProjectDashboard} />
        <Route path="/analytics" exact component={Analytics} />
        <Route path="/tester/:testerId/project/:projectId/ondemand_allocations" exact component={TesterOnDemandAllocation} />
        <Route path="/tester/:testerId/project/:projectId/allocation/:allocationId/tests" exact component={ShowTests} />
        <Route path="/tester/:testerId/project/:projectId/allocation/:allocationId/tests/create" exact component={CreateTest} />
        <Route path="/manager/project/:id/dashboard" exact component={ManagerProjectDashboard} />
        <Route path="/tester/:testerId/project/:id/bugs" exact component={Bugs} />
        <Route path="/admin/projects" exact component={AdminProjects} />
        <Route path="/admin/users" exact component={AdminUsers} />
        <Route path="/admin/project/:id/dashboard" exact component={ManagerProjectDashboard} />
        <Route path="/project/:id/createRun" exact component={CreateRun} />
        <Route path="/project/:id/tests" exact component={ViewTests} />
      </div>
    );
  }
}

export default Routes;
