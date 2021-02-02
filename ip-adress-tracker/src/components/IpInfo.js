import React from 'react';

const IpInfo =(props)=>{

  return(
    <div className="info-container">
      <div className="ip">
        <h4>Ip adress</h4>
        <p>{props.ip}</p>
      </div> 
      <div className="breakline"></div>
      <div className="location">
        <h4>Location</h4>
        <p>{props.location.city}, {props.location.country}</p>
        <p>{props.location.postalCode}</p>
      </div> 
      <div className="breakline"></div>
      <div className="timezone">
        <h4>Timezone</h4>
        <p>UTC {props.location.timezone}</p>
      </div> 
      <div className="breakline"></div>
      <div className="isp">
        <h4>ISP</h4>
        <p>{props.isp}</p>
      </div> 
    </div>

  )
}

export default IpInfo;