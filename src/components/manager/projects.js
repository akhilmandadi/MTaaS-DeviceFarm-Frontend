import React, { Component } from 'react';
import axios from 'axios';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CreateProject from "./createProject";
import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            page: 0,
            rowsPerPage: 10,
            enableCreate: false,
            jobId: ""
        }
        this.viewApplicants = this.viewApplicants.bind(this);
        this.toggleCreate = this.toggleCreate.bind(this);
        this.updateProjects = this.updateProjects.bind(this);
    }

    componentDidMount() {
        this.updateProjects();
    }
    updateProjects = () => {
        let url = process.env.REACT_APP_BACKEND_URL + '/projects/' + sessionStorage.getItem("id") + '?persona=manager';
        axios.defaults.withCredentials = true;
        axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        projects: response.data
                    })
                } else {
                    this.setState({
                        projects: []
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    projects: []
                })
            });
    }
    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    };

    handleChangeRowsPerPage = event => {
        this.setState({
            rowsPerPage: event.target.value,
            page: 0
        })
    };

    toggleCreate = () => {
        this.setState({
            enableCreate: !this.state.enableCreate
        })
    }

    viewApplicants = id => {
        this.setState({
            jobId: id
        })

    }
    render() {
        const colors = ["#3c4f36", "#626e7b", "#254284", "teal", "#003300"]
        let createDialog = null;
        if (this.state.enableCreate) createDialog = (<CreateProject toggleCreate={this.toggleCreate} enableCreate={this.state.enableCreate} updateProjects={this.updateProjects} />)
        else createDialog = null;
        let errorBanner = null;
        if (this.state.projects.length === 0) errorBanner = (<b>No Projects Found</b>)
        return (
            <div className="container" style={{ width: "85%", align: "center", marginTop: "20px" }}>
                {createDialog}
                <div className="row">
                    <Fab variant="extended" style={{ alignContent: "right", backgroundColor: "white" }} onClick={this.toggleCreate} >
                        <AddIcon /><b style={{ fontSize: "10px" }}>Create New Project</b>
                    </Fab>
                    <br /><br />
                </div>
                <div className="row">
                    {this.state.projects.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((project, index) => {
                        return (
                            <Link to={{ pathname: '/project/' + project._id + '/testers', project: project }} style={{ textDecoration: "none" }}>
                                <div className="col-md-3" style={{ width: "260px", marginRight: "5px", marginTop: "5px", marginBottom: "15px", paddingLeft: "0px" }}>
                                    <Card className="cardBox">
                                        <CardHeader style={{ backgroundColor: colors[index % 5] }}
                                            avatar={
                                                <div style={{ height: "100px" }}></div>
                                            }
                                            action={
                                                <IconButton aria-label="settings">
                                                    <span title="Delete" class="glyphicon glyphicon-trash" style={{ fontSize: "16px", color: "red" }}></span>
                                                </IconButton>
                                            }
                                        />
                                        <CardContent className="cardBoxColor" style={{ paddingBottom: "0px", paddingTop: "10px" }}>
                                            <div title={project.name} style={{ fontSize: "16px", color: "#3c4f36", fontWeight: "600", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                                {project.name}
                                            </div>
                                            <div style={{ fontSize: "14px", color: "#6c757c", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                                No of Testers in Project: {project.testers.length}
                                            </div>
                                        </CardContent>
                                        <CardActions disableSpacing style={{ paddingTop: "10px" }}>
                                            <Link to={{ pathname: '/project/' + project._id + '/testers', project: project }}
                                                style={{ textDecoration: "none" }}>
                                                <Button variant="outlined" color="primary" style={{ marginLeft: "8px", marginBottom: "5px " }}>
                                                    View Testers
                                            </Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div style={{ textAlign: "center" }}><br />{errorBanner}</div>
                <TablePagination
                    rowsPerPageOptions={[10, 20]}
                    component="div"
                    count={this.state.projects.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        )
    }
}

export default Projects;