import React, { useState } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import Axios from 'axios';
import SelectOnDemandDevice from './SelectOnDemandDevice';

function ShowOnDemandDevices(props) {
  let [devicesResp,setdevicesResp] = useState({show: false, devices: null});
  if(devicesResp.show && !devicesResp.devices){
    let url = `${process.env.REACT_APP_BACKEND_URL}/devices/ondemand?status=available`
    Axios.get(url).then(resp =>{
      if(resp.status === 200 && resp.data.devices){
        setdevicesResp({show: true, devices: resp.data.devices})
      }
    })
  };
  return (
    <div>
      <Button variant="primary" onClick={e => setdevicesResp({show: true,devices: devicesResp.devices})}>
        Allocate a New Device
      </Button>
      <Modal show={devicesResp.show} onHide={e => setdevicesResp({show: false,devices: devicesResp.devices})}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SelectOnDemandDevice setAllocations={props.setAllocations}devices={devicesResp.devices} projectId={props.projectId}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e => setdevicesResp({show: false,devices: devicesResp.devices})}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShowOnDemandDevices;