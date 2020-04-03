import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

class TesterProjectDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {}
        }
        this.getProjectInfo = this.getProjectInfo.bind(this)
    }

    componentDidMount() {
        this.getProjectInfo();
    }

    getProjectInfo = () => {
        const { match: { params } } = this.props;
        let url = process.env.REACT_APP_BACKEND_URL + '/project/' + params.id;
        axios.defaults.withCredentials = true;
        axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        project: response.data
                    })
                } else {
                    this.setState({
                        project: {}
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    project: {}
                })
            });
    }

    render() {
        return (
            <div className="container" style={{ width: "75%", textAlign: "center", marginTop: "20px" }}>
                <h2>Project Dashboard</h2>
                <h3>{this.state.project.name}</h3>
            </div>
        )
    }
}

export default TesterProjectDashboard;