import React, { Component } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, BarChart, Bar, Cell,
  } from 'recharts';
import '../App.css';

const data1 = [
    {
      name: 'Jan', DeviceMinutes: 4000, MonthlyCost: 2400, amt: 2400,
    },
    {
      name: 'Feb', DeviceMinutes: 3000, MonthlyCost: 1398, amt: 2210,
    },
    {
      name: 'Mar', DeviceMinutes: 2000, MonthlyCost: 9800, amt: 2290,
    },
    {
      name: 'Apr', DeviceMinutes: 2780, MonthlyCost: 3908, amt: 2000,
    },
    {
      name: 'May', DeviceMinutes: 2780, MonthlyCost: 3908, amt: 2000,
    },
    {
      name: 'Jun', DeviceMinutes: 2780, MonthlyCost: 3908, amt: 2000,
    },
    {
      name: 'July', DeviceMinutes: 2780, MonthlyCost: 3908, amt: 2000,
    },
  ];
  const data2 = [
    {
      name: 'Jan', DeviceMinutes: 3000, MonthlyCost: 2400, amt: 2400,
    },
    {
      name: 'Feb', DeviceMinutes: 5000, MonthlyCost: 1598, amt: 2210,
    },
    {
      name: 'Mar', DeviceMinutes: 2050, MonthlyCost: 6800, amt: 2290,
    },
    {
      name: 'Apr', DeviceMinutes: 2780, MonthlyCost: 3908, amt: 2000,
    },
    {
      name: 'May', DeviceMinutes: 4780, MonthlyCost: 3108, amt: 2000,
    },
    {
      name: 'Jun', DeviceMinutes: 1780, MonthlyCost: 2908, amt: 2000,
    },
    {
      name: 'July', DeviceMinutes: 780, MonthlyCost: 4908, amt: 2000,
    },
  ];

  const data3 = [
    {
      name: 'Jan', DeviceMinutes: 2000, MonthlyCost: 1400, amt: 2400,
    },
    {
      name: 'Feb', DeviceMinutes: 3100, MonthlyCost: 1298, amt: 2210,
    },
    {
      name: 'Mar', DeviceMinutes: 4000, MonthlyCost: 7800, amt: 2290,
    },
    {
      name: 'Apr', DeviceMinutes: 2780, MonthlyCost: 3908, amt: 2000,
    },
    {
      name: 'May', DeviceMinutes: 1780, MonthlyCost: 3908, amt: 2000,
    },
    {
      name: 'Jun', DeviceMinutes: 4780, MonthlyCost: 3108, amt: 2000,
    },
    {
      name: 'July', DeviceMinutes: 2780, MonthlyCost: 3108, amt: 2000,
    },
  ];

  const data4 = [
    {
      name: 'Jan', DeviceMinutes: 2000, MonthlyCost: 1400, amt: 2400,
    }
  ];

  const data5 = [
    {
      name: 'Feb', DeviceMinutes: 3100, MonthlyCost: 1298, amt: 2210,
    }
  ];

  const data6 = [
    {
      name: 'Mar', DeviceMinutes: 4000, MonthlyCost: 7800, amt: 2290,
    }
  ];
const project_data = {"Project1": data1, "Project2": data2, "Project3": data3}

const billing_period_data = {"January": data4, "February": data5, "March": data6,
                             "April": data4, "May": data5, "June": data6,
                             "July": data4, "August": data5, "September": data6,
                             "October": data4, "November": data5, "December": data6}

class CostManagementConsole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data1,
            projectGraph: true,
            billingPeriodGraph: false
        }
    }

    changeProjectData = (project) => {
        this.setState({data: project_data[project],
                       projectGraph: true,
                       billingPeriodGraph: false});
    }

    changeBillingPeriodData = (billingPeriod) => {
            this.setState({data: billing_period_data[billingPeriod],
                           projectGraph: false,
                           billingPeriodGraph: true});
    }

    render() {
        let graph = null
        let graph_project = 
        <LineChart width={500} height={450} data={this.state.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: "Billing Period", position: "insideBottomRight", dy: 7}} />
            <YAxis label={{ value: "Amount", position: "insideLeft", angle: -90,   dy: -10}} />
            <Tooltip />
            <Line type="monotone" dataKey="DeviceMinutes" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="MonthlyCost" stroke="#82ca9d" />
      </LineChart>

      let graph_billing_period = 
      <BarChart width={500} height={450} data={this.state.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ value: "Billing Period", position: "insideBottomRight", dy: 7}} />
        <YAxis label={{ value: "Amount", position: "insideLeft", angle: -90,   dy: -10}} />
        <Tooltip />
        <Bar dataKey="DeviceMinutes" fill="#8884d8" />
        <Bar dataKey="MonthlyCost" fill="#82ca9d" />
      </BarChart>

      if (this.state.projectGraph && !this.state.billingPeriodGraph){
        graph = graph_project;
      }
      else{
        graph = graph_billing_period;
      }
        return (
            <div style={{ marginTop: "40px", overflowX: "hidden", overflowY: "hidden" }}>
                <div className="container" style={{ width: "920px", backgroundColor: "white",borderRadius: "7px",padding:"30px 40px 60px" }}>
                    <div style={{ padding:"0px 0px 70px 0px" }}>
                        <h2 style={{ textAlign: "center" }}>Cost Management Console</h2>
                        <div className="dropdown" style={{float:"left" }}>
                            <button className="dropbtn">List of Projects</button>
                            <div className="dropdown-content">
                                <a href="javascript:void(0)" onClick={() => this.changeProjectData('Project1')}>Project1</a>
                                <a href="javascript:void(0)" onClick={() => this.changeProjectData('Project2')}>Project2</a>
                                <a href="javascript:void(0)" onClick={() => this.changeProjectData('Project3')}>Project3</a>
                            </div>
                        </div>
                        <div className="dropdown" style={{float:"right" }}>
                            <button className="dropbtn">Billing Period</button>
                            <div className="dropdown-content">
                                <a href="javascript:void(0)" onClick={() => this.changeBillingPeriodData('January')}>January</a>
                                <a href="javascript:void(0)" onClick={() => this.changeBillingPeriodData('February')}>February</a>
                                <a href="javascript:void(0)" onClick={() => this.changeBillingPeriodData('March')}>March</a>
                                <a href="javascript:void(0)" onClick={() => this.changeBillingPeriodData('April')}>April</a>
                                <a href="javascript:void(0)" onClick={() => this.changeBillingPeriodData('May')}>May</a>
                                <a href="javascript:void(0)" onClick={() => this.changeBillingPeriodData('June')}>June</a>
                                <a href="javascript:void(0)" onClick={() => this.changeBillingPeriodData('July')}>July</a>
                                <a href="javascript:void(0)" onClick={() => this.changeBillingPeriodData('August')}>August</a>
                                <a href="javascript:void(0)" onClick={() => this.changeBillingPeriodData('September')}>September</a>
                                <a href="javascript:void(0)" onClick={() => this.changeBillingPeriodData('October')}>October</a>
                                <a href="javascript:void(0)" onClick={() => this.changeBillingPeriodData('November')}>November</a>
                                <a href="javascript:void(0)" onClick={() => this.changeBillingPeriodData('December')}>December</a>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p>Usage Metrics</p>
                        <div style={{ padding:"0px 0px 0px 140px" }}>
                            {graph}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CostManagementConsole;