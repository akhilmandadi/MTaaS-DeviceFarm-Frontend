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
                    <li><Link to="/tester/projects" style={{ color: "black" }}><span class="glyphicon glyphicon-"></span>Projects</Link></li>
                    <li><Link to="/signin" onClick={this.handleLogout} style={{ color: "black" }}><span class="glyphicon glyphicon-log-out"></span> Logout</Link></li>
                </ul>
            )
        } else if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "manager") {
            navBar = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/manager/projects" style={{ color: "black" }}><span class="glyphicon glyphicon-"></span>Projects</Link></li>
                    <li><Link to="/manager/bugs" style={{ color: "black" }}><span class="glyphicon glyphicon-"></span>Bugs</Link></li>
                    <li><Link to="/signin" onClick={this.handleLogout} style={{ color: "black" }}><span class="glyphicon glyphicon-log-out"></span> Logout</Link></li>
                </ul>
            )
        } else if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("persona") === "admin") {
            navBar = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/admin/projects" style={{ color: "black" }} ><span class="glyphicon glyphicon-"></span>Projects</Link></li>
                    <li><Link to="/signin" onClick={this.handleLogout} style={{ color: "black" }}><span class="glyphicon glyphicon-log-out"></span> Logout</Link></li>
                </ul>
            )
        } else {
            navBar = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/signin" style={{ color: "black" }}><span class="glyphicon glyphicon-log-in"></span> Sign In</Link></li>
                    <li><Link to="/signup" style={{ color: "black" }}><span class="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                </ul>
            )
        }
        let redirectVar = <Redirect to="/signin" />
        return (
            <div>
                {redirectVar}
                <nav class="navbar  navbar-dark bg-dark" style={{ backgroundColor: "#fff", borderRadius: "0px", padding: "0px", margin: "0px", paddingTop: "3px", paddingBottom: "3px" }}>
                    <div class="container-fluid">
                        <div class="navbar-header" style={{ display: "inline" }}>
                            <b class="navbar-brand" style={{ color: "black", display: "inline" }}> MTaaS</b>
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