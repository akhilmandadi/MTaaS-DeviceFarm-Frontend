import React, { useState } from 'react';
import { Button, Modal, Table, Form, Checkbox, Alert } from 'react-bootstrap';
import Axios from 'axios';

function SelectOnDemandDevice(props) {
  let [errorMsg, setErrorMsg] = useState(null);
  let devices = props.devices || [];
  let availabeDeviceTag = null;
  if(devices === null){
    availabeDeviceTag = <tr><td colspan='5' className='text-center'>Loading..</td></tr>
  }
  else if(devices && devices.length < 1){
    availabeDeviceTag = <tr><td colspan='5' className='text-center'>Sorry, no avilable devices at this moment. Please check after some time</td></tr>
  }else{
  }
  let handleSubmit = (e) =>{
    e.preventDefault();
    let form = e.currentTarget;
    let devices = Array.from(form.selectedDevices)
    .filter(device => device.checked)
    .map(device => device.value);
    if(devices.length < 1){
      setErrorMsg(<Alert variant='danger'>No device selected</Alert>);
    }
    let formData = {
      tester: sessionStorage.getItem('id'),
      project: props.projectId,
      devices: devices
    }
    let url = `${process.env.REACT_APP_BACKEND_URL}/allocations/ondemand/real`;
    Axios.post(url,formData,{validateStatus: false}).then(resp => {
      if(resp.status===200 && resp.data.success){
        props.setAllocations({status: 'loading'});
      }else{
        setErrorMsg(<Alert variant='danger'>{resp.data.error}</Alert>);
      }
    })
  }
  return (
    <Form onSubmit={handleSubmit}>
      {errorMsg}
    <Table striped bordered hover>
      <thead>
        <tr>
        <td>Select</td>
        <td>Device Name</td>
        <td>Device Type</td>
        <td>OS Type</td>
        <td>OS Version</td>
        </tr>
      </thead>
      <tbody>
          {devices.map(device => {
            return  <tr>
              <td><Checkbox type='checkbox' name='selectedDevices' value={device._id}></Checkbox></td>
              <td>{device.name}</td>
              <td>{device.deviceType}</td>
              <td>{device.osType}</td>
              <td>{device.osVersion}</td>
            </tr>
          })}
      </tbody>
    </Table>
    <div className='text-right'>
      <Button variant="primary" type='submit'>
      Add Device
      </Button>
    </div>
    </Form>
  );
}

export default SelectOnDemandDevice;