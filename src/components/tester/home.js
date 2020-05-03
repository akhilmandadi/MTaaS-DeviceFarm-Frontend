import React, { Component } from 'react';
import {
    ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, Scatter, PieChart, Pie, Sector, Cell
} from 'recharts';
import _ from 'lodash';
const data01 = [
    { name: 'Total Devices Allocated', value: 10 }
];
const data02 = [
    { name: 'Running', value: 10 },
    { name: 'Failed', value: 3 },
    { name: 'Success', value: 7 },
    { name: 'Pending', value: 7 },
    { name: 'Stopped', value: 7 }
];


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getProjectInfo()
    }

    render() {
        return (
            <div className="">
                <div className="col-md-6">
                    <h2 style={{ marginTop: "20px", marginBottom: "30px" }}>{this.props.project.name}</h2>
                    <h5 style={{ marginTop: "0px", marginBottom: "30px" }}>{this.props.project.description}</h5>
                    <h4 style={{ marginBottom: "10px", textDecoration: "underline" }}>Project Details</h4>
                    <table class="table table-striped table-dark" style={{ width: "350px", marginLeft: "120px" }}>
                        <tbody>
                            <tr class="bg-dark" style={{ textAlign: "center", backgroundColor: "black" }}>
                                <th class="bg-dark" scope="row" style={{ textAlign: "center", color: "white" }}>Manager Name</th>
                                <td class="bg-dark" style={{ textAlign: "center", color: "white" }}>{_.isUndefined(this.props.project.managerId) ? "" : this.props.project.managerId.name}</td>
                            </tr>
                            <tr class="bg-dark" style={{ textAlign: "center", backgroundColor: "black" }}>
                                <th class="bg-dark" scope="row" style={{ textAlign: "center", color: "white" }}>Manager Email</th>
                                <td class="bg-dark" style={{ textAlign: "center", color: "white" }}>{_.isUndefined(this.props.project.managerId) ? "" : this.props.project.managerId.email}</td>
                            </tr>
                            <tr class="bg-dark" style={{ textAlign: "center", backgroundColor: "black" }}>
                                <th class="bg-dark" scope="row" style={{ textAlign: "center", color: "white" }}>Total number of Tests</th>
                                <td class="bg-dark" style={{ textAlign: "center", color: "white" }}>{this.props.project.tests}</td>
                            </tr>
                            <tr class="bg-dark" style={{ textAlign: "center", backgroundColor: "black" }}>
                                <th class="bg-dark" scope="row" style={{ textAlign: "center", color: "white" }}>No of Bugs in the Project</th>
                                <td class="bg-dark" style={{ textAlign: "center", color: "white" }}>{this.props.project.bugs}</td>
                            </tr>
                            <tr class="bg-dark" style={{ textAlign: "center", backgroundColor: "black" }}>
                                <th class="bg-dark" scope="row" style={{ textAlign: "center", color: "white" }}>No of Devices allocated</th>
                                <td class="bg-dark" style={{ textAlign: "center", color: "white" }}>1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <PieChart width={400} height={400} style={{ padding: "0px" }}>
                        <Pie data={data01} isAnimationActive={true} dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" />
                        <Pie data={data02} dataKey="value" cx={200} cy={200} innerRadius={70} outerRadius={120} fill="#82ca9d" label />
                        <Tooltip />
                    </PieChart>
                    <b>Device Allocation and Test Status</b>
                </div>
            </div>
        );
    }
}
