import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../App.css';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout = () => {
        sessionStorage.removeItem("persona");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("id");
    }

    render() {
        let navBar = null;
        if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "tester") {
            navBar = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/tester/projects" style={{ color: "black" }}><span class="glyphicon glyphicon-"></span><b>Projects</b></Link></li>
                    <li><Link to="/signin" onClick={this.handleLogout} style={{ color: "black" }}><span class="glyphicon glyphicon-log-out"></span> <b>Logout</b></Link></li>
                </ul>
            )
        } else if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "manager") {
            navBar = (
                <ul class="nav navbar-nav navbar-right" >
                    <li><Link to="/manager/projects" style={{ color: "black" }}><span class="glyphicon glyphicon-"></span><b>Projects</b></Link></li>
                    <li><Link to="/analytics" style={{ color: "black" }}><span class="glyphicon glyphicon-"></span><b> Billing</b></Link></li>
                    <li><Link to="/signin" onClick={this.handleLogout} style={{ color: "black" }}><span class="glyphicon glyphicon-log-out"></span><b> Logout</b></Link></li>
                </ul>
            )
        } else if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "admin") {
            navBar = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/admin/projects" style={{ color: "black" }} ><span class="glyphicon glyphicon-"></span><b>Projects</b></Link></li>
                    <li><Link to="/admin/users" style={{ color: "black" }} ><span class="glyphicon glyphicon-"></span><b>Users</b></Link></li>
                    <li><Link to="/signin" onClick={this.handleLogout} style={{ color: "black" }}><span class="glyphicon glyphicon-log-out"></span> Logout</Link></li>
                </ul>
            )
        } else {
            navBar = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/signin" style={{ color: "black" }}><span class="glyphicon glyphicon-log-in"></span><b> Sign In</b></Link></li>
                    <li><Link to="/signup" style={{ color: "black" }}><span class="glyphicon glyphicon-user"></span><b> Sign Up</b></Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if (!sessionStorage.getItem("persona")) {
            redirectVar = <Redirect to="/signin" />
        }
        return (
            <div>
                {redirectVar}
                <nav class="navbar navbar-dark bg-dark" style={{ backgroundColor: "white", borderRadius: "0px", padding: "0px", margin: "0px", paddingTop: "3px", paddingBottom: "3px", boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }}>
                    <div class="container-fluid">
                        <div class="navbar-header" style={{ display: "inline" }}>
                            <b class="navbar-brand" style={{ color: "black", display: "inline" }}>
                                Mobile Testing as a Service (MTaaS)
                            </b>
                        </div>
                        <ul class="nav navbar-nav">
                        </ul>
                        {navBar}
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;