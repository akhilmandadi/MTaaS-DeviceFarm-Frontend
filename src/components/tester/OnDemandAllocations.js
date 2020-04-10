import React, { useState } from 'react';
import { useParams } from 'react-router';
import Axios from 'axios';
import {Table} from 'react-bootstrap';
import ShowOnDemandDevices from './ShowOnDemandDevices';
import OnDemandAllocationsList from './OnDemandAllocationsList';

function OnDemandAllocations(props) {
  let {testerId,projectId} = useParams();
  let [allocationResp,setAllocations] = useState({status: 'loading',allocations: {},childMsg:null});
  let url = `${process.env.REACT_APP_BACKEND_URL}/allocations/ondemand?tester=${testerId}&project=${projectId}`;
  if(allocationResp.status === 'loading'){
    Axios.defaults.withCredentials = true;
    Axios.get(url).then(resp =>{
      if(resp.status === 200 && resp.data.allocations){
        setAllocations({ status:'loaded', allocations: resp.data.allocations });
      }
    });
  }
  if(allocationResp.status === 'loading'){
    return <div>Loading...</div>
  }
  return <div className="container" style={{ width: "80%", align: "center", marginTop: "20px" }}>
    <div className="row">
      <h3>On Demand Allocated Devices</h3>
      <ShowOnDemandDevices setAllocations={setAllocations} projectId={projectId}/>
    </div>
    <div className="row">
      <h3>Allocations</h3>
      <OnDemandAllocationsList setAllocations={setAllocations} allocations={allocationResp.allocations}/>
    </div>
  </div>
}

export default OnDemandAllocations;