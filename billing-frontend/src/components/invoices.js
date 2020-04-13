import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';



let table_data = [];
axios.get('http://localhost:3000/allinvoices').then(res => {
                    console.log(res);     
                    console.log(res.data);        
                    for(var i = 0; i < res.data.length; i++){ 
                        var table_row = {
                            "Invoice ID": "",               
                            "Project ID": "",               
                            "Payment Mode": "",               
                            "Transaction Amount": "",              
                            "Billing Period": ""            
                            };                       
                        table_row["Invoice ID"] = res.data[i]["_id"];                
                        table_row["Project ID"] = res.data[i]["projectId"];               
                        table_row["Payment Mode"] = res.data[i]["paymentMode"];                
                        table_row["Transaction Amount"] = res.data[i]["transAmt"];                
                        table_row["Billing Period"] = res.data[i]["billingPeriod"];                
                        table_data.push(table_row);            
                        } 
        }) .catch((err)=>console.log(err));
        
class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
        "paymentMode" : "",
        "transAmt" : "",
        "projectId" : "",
        "billingPeriod" : "",
        "table_data": table_data
        }
    }

    getTableData = () => {
        table_data = [];
        axios.get('http://localhost:3000/allinvoices').then(res => {
                    console.log(res);     
                    console.log(res.data);        
                    for(var i = 0; i < res.data.length; i++){ 
                        var table_row = {
                            "Invoice ID": "",               
                            "Project ID": "",               
                            "Payment Mode": "",               
                            "Transaction Amount": "",              
                            "Billing Period": ""            
                            };                       
                        table_row["Invoice ID"] = res.data[i]["_id"];                
                        table_row["Project ID"] = res.data[i]["projectId"];               
                        table_row["Payment Mode"] = res.data[i]["paymentMode"];                
                        table_row["Transaction Amount"] = res.data[i]["transAmt"];                
                        table_row["Billing Period"] = res.data[i]["billingPeriod"];                
                        table_data.push(table_row);            
                        } 
        this.setState({"table_data": table_data});
        }) .catch((err)=>console.log(err));
    }

    getKeys = () => {
        return Object.keys(this.state["table_data"][0]);
    }

    getHeader = () => {
        var keys = ["Invoice ID", "Project ID", "Payment Mode", "Transaction Amount", "Billing Period"];
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

    createInvoice = () => {
        const data= {
            "paymentMode" : this.state["paymentMode"],
            "transAmt" : this.state["transAmt"],
            "projectId" : this.state["projectId"],
            "billingPeriod" : this.state["billingPeriod"]
            };
        axios.post(`http://localhost:3000/invoices`, 
        data).then(res => {    
        this.getTableData();
        console.log("Table updated successfully");

        }) .catch((err)=>console.log(err));
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
                        "Invoice ID": "",               
                        "Project ID": "",               
                        "Payment Mode": "",               
                        "Transaction Amount": "",              
                        "Billing Period": ""            
                        };                       
                    table_row["Invoice ID"] = this.state["table_data"][i]["Invoice ID"];                
                    table_row["Project ID"] = this.state["table_data"][i]["Project ID"];               
                    table_row["Payment Mode"] = this.state["table_data"][i]["Payment Mode"];                
                    table_row["Transaction Amount"] = this.state["table_data"][i]["Transaction Amount"];                
                    table_row["Billing Period"] = this.state["table_data"][i]["Billing Period"];                
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
                    <h2 style={{ textAlign: "center" }}>Invoices</h2>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                        Create Invoice
                    </button>
                    <div className="dropdown" style={{float:"right" }}>
                        <button className="btn btn-primary">List of Projects</button>
                            <div className="dropdown-content">
                            <a href="javascript:void(0)" onClick={() => this.filterTable('All')}>All</a>
                               {this.projectsDropDown()}
                            </div>
                    </div>
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Enter Invoice Details</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="ProjectID">Project ID</label>
                                        <input type="text" name="projectId" onChange={this.myChangeHandler} class="form-control" id="ProjectID" placeholder="Enter project ID"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="BillingPeriod">Billing period</label>
                                        <input type="text" name="billingPeriod" onChange={this.myChangeHandler} class="form-control" id="BillingPeriod" placeholder="Enter billing period"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="PaymentMode">Payment Mode</label>
                                        <input type="text" name="paymentMode" onChange={this.myChangeHandler} class="form-control" id="PaymentMode" placeholder="Enter Payment Mode"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="Amount">Transaction Amount</label>
                                        <input type="text" name="transAmt" onChange={this.myChangeHandler} class="form-control" id="Amount" placeholder="Enter Transaction Amount"/>
                                    </div>
                                </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={this.createInvoice}>Save changes</button>
                                </div>
                            </div>
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

export default Invoice;

