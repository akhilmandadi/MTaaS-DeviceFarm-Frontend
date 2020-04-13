import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../components/navbar';
import CostManagementConsole from '../components/costmanagementconsole';
import Invoice from '../components/invoices';
import Bills from '../components/bills';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={NavBar} />
        <Route path="/home" component={CostManagementConsole} />
        <Route path='/invoices' component={Invoice} />
        <Route path='/bills' component={Bills} />
      </div>
    );
  }
}

export default Routes;
