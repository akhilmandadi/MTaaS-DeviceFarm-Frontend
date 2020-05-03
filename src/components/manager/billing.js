import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BillsHome from './billsHome';
import Bills from './bills';
import '../../App.css';

const monthMapping = {
    '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May',
    '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October',
    '11': 'November', '12': 'December'
}

let data = [{ name: 'January', DeviceMinutes: 0, MonthlyCost: 0 },
{ name: 'February', DeviceMinutes: 0, MonthlyCost: 0 },
{ name: 'March', DeviceMinutes: 0, MonthlyCost: 0 },
{ name: 'April', DeviceMinutes: 0, MonthlyCost: 0 },
{ name: 'May', DeviceMinutes: 0, MonthlyCost: 0 },
{ name: 'June', DeviceMinutes: 0, MonthlyCost: 0 },
{ name: 'July', DeviceMinutes: 0, MonthlyCost: 0 },
{ name: 'August', DeviceMinutes: 0, MonthlyCost: 0 },
{ name: 'September', DeviceMinutes: 0, MonthlyCost: 0 },
{ name: 'October', DeviceMinutes: 0, MonthlyCost: 0 },
{ name: 'November', DeviceMinutes: 0, MonthlyCost: 0 },
{ name: 'December', DeviceMinutes: 0, MonthlyCost: 0 }];


let billingPeriods = [];
let projects = [];
let projectDetails = [];
const minCost = 5;
let deviceMindetails = [];

function getProjects(){
  let url = process.env.REACT_APP_BACKEND_URL + '/projects/' + sessionStorage.getItem("id") + '?persona=manager';
  axios.defaults.withCredentials = true;
  axios.get(url)
      .then(response => {
          if (response.status === 200) {
              response.data.forEach(element => {
                projects.push(element.name)
              });
              projectDetails = response.data
              projectDetails.forEach(project => {
                getProjectAllocationInfo(project.name, project._id);
              })
          }
      })
      .catch((error) => {
              projects =  []
              projectDetails =  []
      });
}

function getProjectAllocationInfo(project_name, project_id){
  let url = process.env.REACT_APP_BACKEND_URL + '/allocations/peojectallocationdetails/' + project_id;
  axios.defaults.withCredentials = true;
  axios.get(url)
      .then(response => {
          if (response.status === 200) {
            response.data.AllocationDetails.forEach(element => {
                if(!billingPeriods.includes(monthMapping[element.started.split('-')[1]])){
                  billingPeriods.push(monthMapping[element.started.split('-')[1]]);
                }
            });

            generateData(response.data.AllocationDetails, project_name, project_id);
          }
      });
}

function getDeviceDetails(deviceDetails){
    var output = [];

    deviceDetails.forEach(function (item) {
        var existing = output.filter(function (v, i) {
            return v['device'] == item['device'];
        });
        if (existing.length) {
            var existingIndex = output.indexOf(existing[0]);
            output[existingIndex]['deviceminutes'] = output[existingIndex]['deviceminutes'] + item['deviceminutes'];
            output[existingIndex]['cost'] = output[existingIndex]['cost'] + item['cost'];
        } else {
            output.push(item);
        }
    });

    return output;
}

function generateData(projectAllocationDetails, project_name, project_id){
    let deviceDetails = []
    projectAllocationDetails.forEach(allocation => {
        if(allocation.ended != undefined){
            let deviceminutes = 0
            let minutes = 0;
            var started_month = allocation.started.split('-')[1];
            var started_month_name = monthMapping[allocation.started.split('-')[1]];
            var started_year = allocation.started.split('-')[0];
            var ended_month_name = monthMapping[allocation.ended.split('-')[1]];
            var start_date = new Date(allocation.started);
            var end_date = new Date(allocation.ended);
            var last_date = new Date(started_year, started_month, 0);

            if(last_date > end_date){
                var res = Math.abs(end_date - start_date) / 1000;
                minutes = Math.floor(res / 60) % 60;
                
                data.forEach(dataElement => {
                    if(dataElement.name === started_month_name){
                        dataElement.DeviceMinutes += minutes;
                        dataElement.MonthlyCost = dataElement.DeviceMinutes*minCost;
                    }

                });

                deviceminutes = minutes;
            }
            else{
                var res = Math.abs(last_date - start_date) / 1000;
                minutes = Math.floor(res / 60) % 60;

                deviceminutes = minutes;

                data.forEach(dataElement => {
                    if(dataElement.name === started_month_name){
                        dataElement.DeviceMinutes += minutes;
                        dataElement.MonthlyCost = dataElement.DeviceMinutes*minCost;
                    }

                });

                res = Math.abs(end_date - last_date) / 1000;
                minutes = Math.floor(res / 60) % 60;

                data.forEach(dataElement => {
                    if(dataElement.name === ended_month_name){
                        dataElement.DeviceMinutes += minutes;
                        dataElement.MonthlyCost = dataElement.DeviceMinutes*minCost;
                    }

                });

                deviceminutes += minutes;
            }

            deviceDetails.push({'device': allocation.device, 'deviceminutes': deviceminutes, 'cost': deviceminutes*minCost});
        }
    });

    deviceMindetails.push({projectName: project_name, projectId: project_id, data: data, deviceDetails: getDeviceDetails(deviceDetails)});

}


getProjects();


class BillsDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            tab: 0,
            projects: projects,
            projectDetails: projectDetails,
            billingPeriods: billingPeriods,
            deviceMindetails: deviceMindetails
        }
    }

    handleTabChange = (event, newValue) => {
            this.setState({
                tab: newValue
            })
    }
    render() {
        let currentTab = null;
        if (this.state.tab === 0) currentTab = <BillsHome projects={this.state.projects} projectDetails={this.state.projectDetails} billingPeriods={this.state.billingPeriods} deviceMindetails={this.state.deviceMindetails}/>
        if (this.state.tab === 1) currentTab = <Bills projects={this.state.projects} projectDetails={this.state.projectDetails} billingPeriods={this.state.billingPeriods} deviceMindetails={this.state.deviceMindetails}/>
        return(
            <div className="container" style={{ width: "100%", textAlign: "center", marginTop: "0px" }}>
                <Tabs
                    value={this.state.tab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleTabChange}
                    variant="fullWidth"
                    style={{ backgroundColor: "#fff", border: "0.1px solid teal", margin: "0px", marginBottom: "3px", boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }}
                >
                    <Tab className="tabselect" label="Home" style={{ fontSize: "13px", color: "black", border: "0.1px solid teal" }} />
                    <Tab className="tabselect" label="Bills" style={{ fontSize: "13px", color: "black", border: "0.1px solid teal" }} />
                </Tabs>
                {currentTab}
            </div>
        )
    }
};

export default BillsDashboard;