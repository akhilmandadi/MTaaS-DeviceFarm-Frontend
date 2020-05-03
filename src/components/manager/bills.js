import React, { Component } from 'react';
import axios from 'axios';


class Bills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProject: 'all',
            selectedProjectTotalCost: 0,
            table_data: []
        }
    }

    getHeader = () => {
        var keys = ["Device ID", "Device Minutes", "Cost"];
        return keys.map((key, index)=>{
          return <th scope="col" style={{float:"center" }}>{key}</th>
        })
    }
      
      
    getRowsData = () => {
        const RenderRow = (props) =>{
            return props.keys.map((key, index)=>{
              return <td key={props.data[key]}>{props.data[key]}</td>
            })
        };

        var items = this.state.table_data;
        console.log(items);
        var keys = ["device", "deviceminutes", "cost"];
        return items.map((row, index)=>{
          return <tr key={index}><th scope="row">{index + 1}</th><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }

    onChangeProject = (e) => {
          if(e.target.value == 'all'){
              this.setState({
                  selectedProject: 'all'
              })
          }
          else{
            var res = this.props.deviceMindetails.filter(deviceMindetail => deviceMindetail.projectName === e.target.value);
            console.log(res);
            let totalCost = 0;
            res[0].deviceDetails.forEach(detail => {totalCost += detail['cost']});
            this.setState({
                  selectedProject: e.target.value,
                  selectedProjectTotalCost: totalCost,
                  table_data: res[0].deviceDetails
              })
          }
      }

    render() {
        let totalCostElement = null;
        if(this.state.selectedProject === 'all'){
            totalCostElement = <h>Please select project to view total cost and details</h>
        }
        else{
            totalCostElement = <div>
                                <div style={{ padding:"0px 0px 40px 0px" }}>
                                    <h style={{float:"left" }}><b>Total Cost</b></h>
                                    <h style={{float:"right" }}><b>${this.state.selectedProjectTotalCost}</b></h>
                                </div>
                                <br></br>
                                <div>
                                    <h style={{ float: "left" }}><b>Details</b></h>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                {this.getHeader()}
                                            </tr>
                                        </thead>
                                        <tbody style={{ textAlign: "left" }}>
                                            {this.getRowsData()}
                                        </tbody>
                                    </table>
                                </div>
                               </div>
        }
        return(
            <div style={{ marginTop: "40px", overflowX: "hidden", overflowY: "hidden" }}>
                <div className="container" style={{ width: "920px", backgroundColor: "white",borderRadius: "7px",padding:"30px 40px 60px" }}>
                    <div style={{ padding:"0px 0px 70px 0px" }}>
                        <div className="dropdown" style={{float:"left" }}>
                            <select ref="userInput"
                                required
                                style={{ width: "400px" }}
                                className="form-control"
                                value={this.state.selectedProject}
                                onChange={this.onChangeProject}>
                                <option key='all' value='all'>List of Projects</option>
                                {
                                    this.props.projects.map((project) => {
                                        return <option key={project} value={project}>{project}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        {totalCostElement}
                    </div>
                </div>
            </div>

        )
    }
};

export default Bills;