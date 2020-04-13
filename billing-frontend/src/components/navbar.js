import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../App.css';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let navBar = null;
        navBar = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/home" style={{ color: "black" }}><span className="glyphicon glyphicon-home"></span> Home</Link></li>
                <li><Link to="/bills" style={{ color: "black" }}><span className="glyphicon glyphicon-log-in"></span> Bills</Link></li>
                <li><Link to="/invoices" style={{ color: "black" }}><span className="glyphicon glyphicon-log-in"></span> Invoices</Link></li>
            </ul>
        )
        let redirectVar = <Redirect to="/home" />
        return (
            <div>
                {redirectVar}
                <nav className="navbar  navbar-dark bg-dark" style={{ backgroundColor: "#fff", borderRadius: "0px", padding: "0px", margin: "0px", paddingTop: "3px", paddingBottom: "3px" }}>
                    <div className="container-fluid">
                        <div className="navbar-header" style={{ display: "inline" }}>
                            <b className="navbar-brand" style={{ color: "black", display: "inline" }}> MTaaS</b>
                        </div>
                        <ul className="nav navbar-nav">
                        </ul>
                        {navBar}
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;