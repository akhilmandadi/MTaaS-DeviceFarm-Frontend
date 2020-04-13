import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';


let table_data = [];
axios.get('http://localhost:3000/totalbills').then(res => {
                    console.log(res);     
                    console.log(res.data);        
                    for(var i = 0; i < res.data.length; i++){ 
                        var table_row = {
                            "Bill ID": "",
                            "Project ID": "",               
                            "Billing Period": "",               
                            "Amount Paid": "", 
                            "Total Charges": "",
                            "Amount Due": ""                         
                            };                       
                        table_row["Bill ID"] = res.data[i]["_id"];                
                        table_row["Project ID"] = res.data[i]["projectId"];               
                        table_row["Billing Period"] = res.data[i]["billingPeriod"];                
                        table_row["Amount Paid"] = res.data[i]["amountPaid"];                
                        table_row["Total Charges"] = res.data[i]["totalCost"]; 
                        table_row["Amount Due"] = res.data[i]["due"];               
                        table_data.push(table_row);            
                        } 
        }) .catch((err)=>console.log(err));

class Bill extends Component {
    constructor(props) {
        super(props);
        this.state = {
        "projectId" : "",
        "amountPaid" : "",
        "totalCost" : "",            
        "billingPeriod" : "",
        "due" : "",
        "table_data": table_data
            }
    }

    getTableData = () => {
        table_data = [];
        axios.get('http://localhost:3000/totalbills').then(res => {
                    console.log(res);     
                    console.log(res.data);        
                    for(var i = 0; i < res.data.length; i++){ 
                        var table_row = {
                            "Bill ID": "",
                            "Project ID": "",               
                            "Billing Period": "",               
                            "Amount Paid": "", 
                            "Total Charges": "",
                            "Amount Due": ""               
                            };                       
                        table_row["Bill ID"] = res.data[i]["_id"];                
                        table_row["Project ID"] = res.data[i]["projectId"];
                        table_row["Billing Period"] = res.data[i]["billingPeriod"];                 
                        table_row["Amount Paid"] = res.data[i]["amountPaid"];                
                        table_row["Total Charges"] = res.data[i]["totalCost"];                
                        table_row["Amount Due"] = res.data[i]["due"];                
                        table_data.push(table_row);            
                        } 
        this.setState({"table_data": table_data});
        }) .catch((err)=>console.log(err));
    }

    getKeys = () => {
        return Object.keys(this.state["table_data"][0]);
    }

    getHeader = () => {
        var keys = ["Bill ID", "Project ID", "Billing Period", "Amount Paid", "Total Charges", "Amount Due"];
        return keys.map((key, index)=>{
          return <th scope="col">{key}</th>
        })
    }

    getRowsData = () => {
        const RenderRow = (props) =>{
            return props.keys.map((key, index)=>{
              return <td key={props.data[key]}>{props.data[key]}</td>
            })
        };

        var items = this.state["table_data"];
        var keys = this.getKeys();
        return items.map((row, index)=>{
          return <tr key={index}><th scope="row">{index + 1}</th><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
    
    projectsDropDown = () => {
        var d = [];
        
        for(var i = 0; i < this.state["table_data"].length; i++){
            d.push(this.state["table_data"][i]["Project ID"]);
        }
        d = Array.from(new Set(d));
        return d.map((row, index)=>{
            return <a key={index + 1} href="javascript:void(0)" data ={row} onClick={() => this.filterTable(row)}>{row}</a>
          }) 
    }
    
    filterTable = (row) => {
        table_data = [];
        if(row == "All"){
            this.getTableData();
        }
        else{
            for(var i = 0; i < this.state["table_data"].length; i++){ 
                if(this.state["table_data"][i]["Project ID"] == row){
                    var table_row = {
                        "Bill ID": "",
                        "Project ID": "",               
                        "Billing Period": "",               
                        "Amount Paid": "", 
                        "Total Charges": "",
                        "Amount Due": ""            
                        };                       
                    table_row["Bill ID"] = this.state["table_data"][i]["Bill ID"];                
                    table_row["Project ID"] = this.state["table_data"][i]["Project ID"];               
                    table_row["Billing Period"] = this.state["table_data"][i]["Billing Period"];                
                    table_row["Amount Paid"] = this.state["table_data"][i]["Amount Paid"];                
                    table_row["Total Charges"] = this.state["table_data"][i]["Total Charges"];
                    table_row["Amount Due"] = this.state["table_data"][i]["Amount Due"];               
                    table_data.push(table_row);            
                    } 
            }
            this.setState({"table_data": table_data});
        }
    }


    

        render() {
    return (
        <div style={{ marginTop: "40px", overflowX: "hidden", overflowY: "hidden" }}>
            <div className="container" style={{ width: "920px", backgroundColor: "white",borderRadius: "7px",padding:"30px 40px 60px" }}>
                <h2 style={{ textAlign: "center" }}>Bills</h2>
                <div className="dropdown" style={{float:"right" }}>
                        <button className="btn btn-primary">List of Projects</button>
                            <div className="dropdown-content">
                            <a href="javascript:void(0)" onClick={() => this.filterTable('All')}>All</a>
                               {this.projectsDropDown()}
                            </div>
                    </div>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        {this.getHeader()}                            
                        </tr>
                    </thead>
                    <tbody>
                    {this.getRowsData()}
                    </tbody>
                </table>
            </div>
        </div>
         )
        }
    }



export default Bill;