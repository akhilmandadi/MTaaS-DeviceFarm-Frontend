import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactJson from 'react-json-view'
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';
import Loading from '../loading';
import { Typography } from '@material-ui/core';

const columns = [
    { id: 'runName', label: 'Name', minWidth: 170 },
    { id: 'testerId', label: 'Started By', minWidth: 100 },
    {
        id: 'started',
        label: 'Started At',
        minWidth: 170
    },
    {
        id: 'stopped',
        label: 'Ended At',
        minWidth: 100
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100
    },
    {
        id: 'result',
        label: 'Result',
        minWidth: 170
    },
    { id: 'view', label: '', minWidth: 50 },
    { id: 'stop', label: '', minWidth: 50 }
];


class Tests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
            tests: [],
            loading: false,
            loadingText: "",
            testDetails: {},
            detailsPage: false,
            currentTest: ""
        }
    }

    componentDidMount() {
        this.fetchRuns();
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

    fetchRuns = () => {
        this.setState({
            loading: true,
            loadingText: "Fetching tests!"
        })
        const { project } = this.props;
        let url = process.env.REACT_APP_BACKEND_URL + '/project/' + project._id + '/tests';
        axios.defaults.withCredentials = true;
        axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        loading: false,
                        loadingText: "",
                        tests: response.data
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    loadingText: "",
                    tests: []
                })
            });
    }

    openDetails = (id) => {
        this.setState({
            detailsPage: true,
            currentTest: id,
            loading: true,
            loadingText: "Fetching Test Details!"
        })
        axios.post(process.env.REACT_APP_BACKEND_URL + '/rundetails', { "id": id })
            .then(response => {
                response.data.run.parsingResultUrl = "";
                if (response.status === 200) {
                    this.setState({
                        loading: false,
                        loadingText: "",
                        testDetails: response.data.run
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    loadingText: "",
                    testDetails: {}
                })
            });
    }

    closeDetails = () => {
        this.setState({
            detailsPage: false,
            testDetails: {}
        })
    }

    render() {
        return (
            <div class="container" style={{ width: "95%", marginTop: "20px" }} >
                <Dialog style={{ overflowX: "hidden !important" }} fullWidth open={this.state.detailsPage} onClose={this.closeDetails} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Run Details</DialogTitle>
                    <DialogContent>
                        <ReactJson 
                        src={this.state.testDetails} 
                        collapsed={false}
                        displayDataTypes={false}
                        sortKeys={false}
                        enableClipboard={false}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDetails} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className="row">
                    <div className='col-md-6' style={{'text-align':'left', 'padding-left':'30px', 'padding-bottom': '10px'}}>
                    <Typography variant="h3"><b>Run Details</b></Typography>
                    </div>
                    <div className='col-md-6' style={{'text-align':'right'}}>
                        <button type="button" class="btn btn-success" onClick={this.fetchRuns}>
                            <span class="glyphicon glyphicon-refresh"></span>  Refresh Test Statuses
                        </button>
                    </div>
                </div>
                <Loading loading={this.state.loading} loadingText={this.state.loadingText} />
                <div>
                    <Paper >
                        <TableContainer style={{}} >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                    backgroundColor: "#ababab", fontSize: "12px", textAlign: "center"
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.tests.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    console.log(column.id)
                                                    if (column.id === "view") {
                                                        return (
                                                            <TableCell key={column.id} align={column.align} style={{ textAlign: "center", fontSize: "10px" }}>
                                                                <Button color="primary" onClick={() => this.openDetails(row.arn)}>View Details</Button>
                                                            </TableCell>
                                                        );
                                                    }
                                                    if (column.id === "stop") {
                                                        return (
                                                            <TableCell key={column.id} align={column.align} style={{ textAlign: "center", fontSize: "10px" }}>
                                                                {(row.status === "COMPLETED" || row.status === "STOPPING") ? ("") : (<Button color="secondary">Stop</Button>)}
                                                            </TableCell>
                                                        );
                                                    }
                                                    if (column.id === "started" || column.id === "stopped") {
                                                        return (
                                                            <TableCell key={column.id} align={column.align} style={{ textAlign: "center", fontSize: "10px", color: "black" }}>
                                                                {_.isUndefined(value) ? "Still Running" : moment(value).format("LLLL")}
                                                            </TableCell>
                                                        );
                                                    }
                                                    if (column.id === "testerId") {
                                                        return (
                                                            <TableCell key={column.id} align={column.align} style={{ textAlign: "center", fontSize: "10px", color: "black" }}>
                                                                {value.name}
                                                            </TableCell>
                                                        );
                                                    }
                                                    return (
                                                        <TableCell key={column.id} align={column.align} style={{ textAlign: "center", fontSize: "11px", color: "black" }}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={this.state.tests.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </div>
            </div>
        )
    }
}

export default Tests;