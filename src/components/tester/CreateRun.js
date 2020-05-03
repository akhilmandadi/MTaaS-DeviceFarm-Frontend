import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loading from '../loading';

class CreateRun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            page: 0,
            rowsPerPage: 10,
            enableCreate: false,
            runName: "",
            appType: "",
            selectedDevices: [],
            allDevices: false,
            OS: ['Android', 'iOS'],
            selectedOS: 'Android',
            devicepool: "",
            testPackageFileType: 'APPIUM_JAVA_TESTNG_TEST_PACKAGE',
            testPackageFileTypes: ['', '', 'APPIUM_JAVA_JUNIT_TEST_PACKAGE', 'APPIUM_JAVA_TESTNG_TEST_PACKAGE', 'APPIUM_PYTHON_TEST_PACKAGE',
                'APPIUM_NODE_TEST_PACKAGE', 'APPIUM_RUBY_TEST_PACKAGE', 'CALABASH_TEST_PACKAGE', 'INSTRUMENTATION_TEST_PACKAGE',
                'UIAUTOMATION_TEST_PACKAGE', 'UIAUTOMATOR_TEST_PACKAGE', 'XCTEST_TEST_PACKAGE', 'XCTEST_UI_TEST_PACKAGE'],
            testType: 'BUILTIN_FUZZ',
            testTypes: ['BUILTIN_FUZZ', 'BUILTIN_EXPLORER', 'APPIUM_JAVA_JUNIT', 'APPIUM_JAVA_TESTNG', 'APPIUM_PYTHON',
                'APPIUM_NODE', 'APPIUM_RUBY', 'CALABASH', 'INSTRUMENTATION', 'UIAUTOMATION', 'UIAUTOMATOR',
                'XCTEST', 'XCTEST_UI'],
            supportedDevices: [
                [
                    { name: 'Google Pixel 3 XL - OS 9', arn: 'arn:aws:devicefarm:us-west-2::device:E1F3149FDC33484D824BCFF66003E609' },
                    { name: 'Google Pixel 2 XL - OS 9', arn: 'arn:aws:devicefarm:us-west-2::device:E64D26FE27644A39A4BCEF009CDD8645' },
                    { name: 'Samsung Galaxy A50 - OS 9', arn: 'arn:aws:devicefarm:us-west-2::device:E4438F5D016544A8BB8557C459084F9D' },
                    { name: 'Samsung Galaxy S9+ (Unlocked) - OS 9', arn: 'arn:aws:devicefarm:us-west-2::device:8F772FF1E1AE4433B82286B1DA52FED8' },
                    { name: 'Samsung Galaxy S9 (Unlocked) - OS 9', arn: 'arn:aws:devicefarm:us-west-2::device:CE68825ABE5A4740B56F10111FD47844' },
                    { name: 'Samsung Galaxy Note 10 - OS 9', arn: 'arn:aws:devicefarm:us-west-2::device:851BA6E2A15E410FB93178EBC62F4B48' },
                    { name: 'Samsung Galaxy A40 - OS 9', arn: 'arn:aws:devicefarm:us-west-2::device:DD61B8C65B1C46A9B3D5285A448BB4A4' },
                ], [
                    { name: 'Apple iPhone 7 Plus - OS 12', arn: 'arn:aws:devicefarm:us-west-2::device:51ED4AB875C543AC97E6F65F7473E7B8' },
                    { name: 'Apple iPhone 8 - OS 12', arn: 'arn:aws:devicefarm:us-west-2::device:AF74786682D3407D89BD16557FEE97A9' },
                    { name: 'Apple iPhone X - OS 12', arn: 'arn:aws:devicefarm:us-west-2::device:D125AEEE8614463BAE106865CAF4470E' },
                    { name: 'Apple iPhone 11 Pro - OS 13.1.3', arn: 'arn:aws:devicefarm:us-west-2::device:FB7DB406870A445A90958D233DF789BC' },
                    { name: 'Apple iPhone 11 - OS 13.1.3', arn: 'arn:aws:devicefarm:us-west-2::device:8EFC9DF49F09451E831E93DA281DAF9F' }
                ]
            ],
            appFile: null,
            testFile: null,
            appFileType: 'ANDROID_APP',
            appFileTypes: ['ANDROID_APP', 'IOS_APP'],
            currentDevices: [],
            loading: false,
            loadingText: "",
            scheduleStatus: false
        }
        this.onChange = this.onChange.bind(this);
        this.createRun = this.createRun.bind(this);
        this.handleDeviceChange = this.handleDeviceChange.bind(this);
        this.toggleAllDevices = this.toggleAllDevices.bind(this);
    }

    componentDidMount() {
        this.setState({
            currentDevices: this.state.supportedDevices[0]
        })
    }

    onChangeTestType = (e) => {
        var idx = this.state.testTypes.indexOf(e.target.value)
        this.setState({
            testType: e.target.value,
            testPackageFileType: this.state.testPackageFileTypes[idx]
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createRun = (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
            loadingText: "Scheduling a run!"
        })
        const { match: { params } } = this.props;
        let fdata = new FormData();
        fdata.append('runName', this.state.runName);
        fdata.append('projectName', this.state.appType);
        fdata.append('selectedOS', this.state.selectedOS);
        fdata.append('selectedDevices', JSON.stringify(this.state.selectedDevices));
        fdata.append('devicepool', this.state.devicepool);
        fdata.append('testType', this.state.testType);
        fdata.append('appFileType', this.state.appFileType);
        fdata.append('testPackageFileType', this.state.testPackageFileType);
        fdata.append("testerId", sessionStorage.getItem("id"));
        fdata.append("projectId", params.id)
        let files = [];
        files.push(this.state.appFile)
        files.push(this.state.testFile)
        fdata.append("files", this.state.appFile);
        fdata.append("files", this.state.testFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        let url = process.env.REACT_APP_BACKEND_URL + '/projects/' + params.id + '/createrun';
        axios.post(url, fdata, config)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        loading: false,
                        loadingText: "",
                        scheduleStatus: true
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    loadingText: "",
                    scheduleStatus: false
                })
            });
    }

    handleDeviceChange(e, val) {
        let devices = val
        if (val.length === 0) devices = []
        this.setState({
            allDevices: false,
            selectedDevices: devices
        });
    }

    toggleAllDevices(e) {
        const isChecked = !this.state.allDevices;
        this.setState(
            {
                allDevices: isChecked,
                selectedDevices: isChecked ? (this.state.selectedOS === "Android" ? this.state.supportedDevices[0] : this.state.supportedDevices[1]) : []
            });
    }

    onChangeOS = (e) => {
        this.setState({
            allDevices: false,
            selectedOS: e.target.value,
            selectedDevices: [],
            currentDevices: e.target.value === "Android" ? this.state.supportedDevices[0] : this.state.supportedDevices[1],
            appFileType: e.target.value === "Android" ? this.state.appFileTypes[0] : this.state.appFileTypes[1]
        })
    }

    onChangeAppFileUpload = (e) => {
        this.setState({
            appFile: e.target.files[0]
        });
    }

    onChangeTestFileUpload = (e) => {
        this.setState({
            testFile: e.target.files[0]
        });
    }

    render() {
        const { match: { params } } = this.props;
        let redirectVar = null
        if (this.state.scheduleStatus == true) redirectVar = <Redirect to={"/project/" + params.id + '/tests'} />
        return (
            <div className="container" style={{ width: "80%", textAlign: "center", backgroundColor: "white", marginTop: "7px", paddingBottom: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.3)", borderRadius: "3px" }}>
                <Loading loading={this.state.loading} loadingText={this.state.loadingText} />
                {redirectVar}
                <h3 style={{ marginBottom: "20px" }}>Create New Test Run</h3>
                <form onSubmit={this.createRun}>
                    <div className="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-2" style={{ padding: "0px", textAlign: "right" }}>
                            <label style={{ lineHeight: "45px", padding: "0px" }}>Test Name</label>
                        </div>
                        <div class="col-md-6" style={{ padding: "0px 30px 0px" }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="runName"
                                label="Test Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                autoComplete="off"
                                style={{ width: "400px", backgroundColor: "white", float: "left" }}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-2" style={{ padding: "0px", textAlign: "right" }}>
                            <label style={{ lineHeight: "45px", padding: "0px" }}>Project Name</label>
                        </div>
                        <div class="col-md-6" style={{ padding: "0px 30px 0px" }}>
                            <TextField
                                margin="dense"
                                name="appType"
                                label="Project Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                autoComplete="off"
                                style={{ width: "400px", backgroundColor: "white", float: "left" }}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "10px" }}>
                        <div class="col-md-2"></div>
                        <div class="col-md-2" style={{ padding: "0px", textAlign: "right" }}>
                            <label style={{ lineHeight: "45px", padding: "0px" }}>Operating System</label>
                        </div>
                        <div class="col-md-6" style={{ padding: "0px 30px 0px" }}>
                            <select ref="userInput"
                                required
                                style={{ width: "400px" }}
                                className="form-control"
                                value={this.state.selectedOS}
                                onChange={this.onChangeOS}>
                                {
                                    this.state.OS.map((os) => {
                                        return <option key={os} value={os}>{os}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-2" style={{ padding: "0px", textAlign: "right" }}>
                            <label style={{}}>Select the Devices to Run Tests On</label>
                        </div>
                        <div class="col-md-6" style={{ padding: "0px 30px 0px" }}>
                            <Autocomplete
                                style={{ width: "400px", backgroundColor: "white", align: "center" }}
                                multiple
                                limitTags={2}
                                size="medium"
                                id="multiple-limit-tags"
                                ChipProps={{ color: "primary", size: "small" }}
                                onChange={this.handleDeviceChange}
                                options={this.state.currentDevices}
                                value={this.state.selectedDevices}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" placeholder="Select all Devices" />
                                )}
                            />
                        </div>
                    </div>
                    <input
                        onChange={this.toggleAllDevices}
                        type="checkbox"
                        id="devices"
                        value="devices"
                        checked={this.state.allDevices}
                    />
                    <label>Select all Devices</label>
                    <div className="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-2" style={{ padding: "0px", textAlign: "right" }}>
                            <label style={{ lineHeight: "45px", padding: "0px" }}>Device Pool</label>
                        </div>
                        <div class="col-md-6" style={{ padding: "0px 30px 0px" }}>
                            <TextField
                                margin="dense"
                                name="devicepool"
                                label="Device Pool Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                autoComplete="off"
                                style={{ width: "400px", backgroundColor: "white", float: "left" }}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "10px" }}>
                        <div class="col-md-2"></div>
                        <div class="col-md-2" style={{ padding: "0px", textAlign: "right" }}>
                            <label style={{ lineHeight: "45px", padding: "0px" }}>Test Type</label>
                        </div>
                        <div class="col-md-6" style={{ padding: "0px 30px 0px" }}>
                            <select ref="userInput"
                                required
                                style={{ width: "400px" }}
                                className="form-control"
                                value={this.state.testType}
                                onChange={this.onChangeTestType}>
                                {
                                    this.state.testTypes.map((tt) => {
                                        return <option key={tt} value={tt}>{tt}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-2" style={{ padding: "0px", textAlign: "right" }}>
                            <label style={{ lineHeight: "45px", padding: "0px" }}>Application File</label>
                        </div>
                        <div class="col-md-6" style={{ padding: "0px 30px 0px" }}>
                            <input type="file"
                                required
                                className="form-control"
                                multiple=""
                                accept=".apk,.ipa"
                                style={{ width: "400px", backgroundColor: "white" }}
                                onChange={this.onChangeAppFileUpload}>
                            </input>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-2" style={{ padding: "0px", textAlign: "right" }}>
                            <label style={{ lineHeight: "45px", padding: "0px" }}>Testing File</label>
                        </div>
                        <div class="col-md-6" style={{ padding: "0px 30px 0px" }}>
                            <input type="file"
                                required
                                className="form-control"
                                multiple=""
                                accept=".zip"
                                style={{ width: "400px", backgroundColor: "white" }}
                                onChange={this.onChangeTestFileUpload}>
                            </input>
                        </div>
                    </div>
                    <div className="row" style={{ margin: "0px 0px 0px" }}>
                        <Button type="submit" variant="contained" color="primary" style={{ padding: "8px 10px 8px", fontSize: "12px" }}>
                            Start New Run
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateRun;