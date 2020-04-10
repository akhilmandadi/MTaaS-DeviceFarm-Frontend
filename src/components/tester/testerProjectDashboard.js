import React, { Component } from 'react';
import axios from 'axios';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Redirect, useParams } from 'react-router';
import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function TesterProjectDashboard(props) {
    let {id} = useParams();
    const colors = ["#3c4f36", "#626e7b", "#254284", "teal", "#003300"];
    return (
        <div className="container" style={{ width: "80%", align: "center", marginTop: "20px" }}>
        <div className="row">
            <Link to={{ pathname: `/tester/${sessionStorage.getItem("id")}/project/${id}/ondemand_allocations`}} style={{ textDecoration: "none" }}>
                <div title={"Go to Allocated devices "} className="col-md-3" style={{ width: "260px", marginRight: "5px", marginTop: "5px", marginBottom: "15px", paddingLeft: "0px" }}>
                    <Card className="cardBox">
                        <CardHeader style={{ backgroundColor: colors[4] }}
                            avatar={
                                <div style={{ height: "100px" }}></div>
                            }
                            action={
                                <IconButton aria-label="settings">
                                </IconButton>
                            }
                        />
                        <CardContent className="cardBoxColor" style={{ paddingBottom: "0px", paddingTop: "10px" }}>
                            <div style={{ fontSize: "16px", color: "#3c4f36", fontWeight: "600", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                {"On Demand Devices"}
                            </div>
                            {/* <div style={{ fontSize: "14px", color: "#6c757c", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                No of devices: {"2"}
                            </div> */}
                        </CardContent>
                        <CardActions disableSpacing style={{ paddingTop: "10px" }}>
                        </CardActions>
                    </Card>
                </div>
            </Link>
        </div>
    </div>
);
}


// class TesterProjectDashboard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             project: {}
//         }
//         this.getProjectInfo = this.getProjectInfo.bind(this)
//     }

//     componentDidMount() {
//         this.getProjectInfo();
//     }

//     getProjectInfo = () => {
//         const { match: { params } } = this.props;
//         let url = process.env.REACT_APP_BACKEND_URL + '/project/' + params.id;
//         axios.defaults.withCredentials = true;
//         axios.get(url)
//             .then(response => {
//                 if (response.status === 200) {
//                     this.setState({
//                         project: response.data
//                     })
//                 } else {
//                     this.setState({
//                         project: {}
//                     })
//                 }
//             })
//             .catch((error) => {
//                 this.setState({
//                     project: {}
//                 })
//             });
//     }

//     render() {
//         return (
//             <div className="container" style={{ width: "75%", textAlign: "center", marginTop: "20px" }}>
//                 <h2>Project Dashboard</h2>
//                 <h3>{this.state.project.name}</h3>
//             </div>
//         )
//     }
// }

export default TesterProjectDashboard;