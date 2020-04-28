import React, { Component } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import Typography from '@material-ui/core/Typography';

class Devices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10
        }
    }

    componentDidMount() {
        this.props.getProjectInfo();
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

    render() {
        return (
            <div className="container" style={{ width: "85%", align: "center", marginTop: "20px" }}>
                <div className="row">
                    <div className="col-md-2" style={{  marginTop: "5px", marginBottom: "5px", paddingLeft: "0px" }}>
                        <Card className="cardBox" style={{ backgroundColor: "#b8babf" }}>
                            <CardContent className="cardBoxColor" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                <div>
                                    <PhoneAndroidIcon style={{ fontSize: 85, color: "#081d40" }} />
                                </div>
                                <div style={{ fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                    <h4>Samsung S10</h4>
                                    <div class="row">
                                        <Typography color="" variant="h6" style={{ display: "inline" }}><span class="glyphicon glyphicon-user"></span>
                                            &nbsp;Akhil Reddy
                                            </Typography>
                                    </div>
                                    <div class="row" style={{ paddingLeft: "0px" }}>
                                        <Typography color="" variant="h6" style={{ display: "inline" }}><span class="glyphicon glyphicon-time"></span>
                                            &nbsp;Friday, March 10 2020
                                        </Typography>
                                    </div>
                                    <div class="row">
                                        <Typography color="" variant="h6" style={{ display: "inline" }}><span class="glyphicon glyphicon-hourglass"></span>
                                            &nbsp;Status: Free
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-md-2" style={{  marginTop: "5px", marginBottom: "5px", paddingLeft: "0px" }}>
                        <Card className="cardBox" style={{ backgroundColor: "#b8babf" }}>
                            <CardContent className="cardBoxColor" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                <div>
                                    <PhoneAndroidIcon style={{ fontSize: 85, color: "#081d40" }} />
                                </div>
                                <div style={{ fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                    <h4>Pixel 2 XL</h4>
                                    <div class="row">
                                        <Typography color="" variant="h6" style={{ display: "inline" }}><span class="glyphicon glyphicon-user"></span>
                                            &nbsp;Akhil Reddy
                                            </Typography>
                                    </div>
                                    <div class="row" style={{ paddingLeft: "0px" }}>
                                        <Typography color="" variant="h6" style={{ display: "inline" }}><span class="glyphicon glyphicon-time"></span>
                                            &nbsp;Friday, March 10 2020
                                        </Typography>
                                    </div>
                                    <div class="row">
                                        <Typography color="" variant="h6" style={{ display: "inline" }}><span class="glyphicon glyphicon-hourglass"></span>
                                            &nbsp;Status: Free
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-md-2" style={{  marginTop: "5px", marginBottom: "5px", paddingLeft: "0px" }}>
                        <Card className="cardBox" style={{ backgroundColor: "#b8babf" }}>
                            <CardContent className="cardBoxColor" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                <div>
                                    <PhoneAndroidIcon style={{ fontSize: 85, color: "#081d40" }} />
                                </div>
                                <div style={{ fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                    <h4>Iphone XR</h4>
                                    <div class="row">
                                        <Typography color="" variant="h6" style={{ display: "inline" }}><span class="glyphicon glyphicon-user"></span>
                                            &nbsp;Prashanth
                                            </Typography>
                                    </div>
                                    <div class="row" style={{ paddingLeft: "0px" }}>
                                        <Typography color="" variant="h6" style={{ display: "inline" }}><span class="glyphicon glyphicon-time"></span>
                                            &nbsp;Sunday, Apr 13 2020
                                        </Typography>
                                    </div>
                                    <div class="row">
                                        <Typography color="" variant="h6" style={{ display: "inline" }}><span class="glyphicon glyphicon-hourglass"></span>
                                            &nbsp;Status: Free
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 20]}
                    component="div"
                    count={1}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        )
    }
}

export default Devices;