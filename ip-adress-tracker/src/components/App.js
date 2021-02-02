import React from 'react';
import IpInfo from './IpInfo';
import arrow from '../images/icon-arrow.svg'
class App extends React.Component{
  state={
    ipInput:'',
    domainInput:'',
    location:{},
    ip:'',
    isp:''
  }
  
  componentDidMount(){
    this.fetchData();
  }
  
  
  createMap= (latitude,longitude)=>{
    
    if (this.mymap) {
        this.mymap.remove();
    }
    
    this.mymap = window.L.map('mapid')
    
    this.mymap.setView(new window.L.LatLng(latitude, longitude), 13);
    
    window.L.tileLayer("https://api.mapbox.com/styles/v1/lazarandrei/ckkm4fpn13zkn17rycgaaahgd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF6YXJhbmRyZWkiLCJhIjoiY2trbDVpZm5mMmR4MTJubW5xa3Z0ZTFkciJ9.YYmMwc15ijwBr71lJilbOg", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    minZoom:2,
    maxZoom:18,
    }).addTo(this.mymap);

    window.L.marker([latitude, longitude]).addTo(this.mymap);
    this.mymap.dragging.enable();
  }

  
  fetchData=()=>{
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_U6kRR0q4H5siqTcz7C1dpy7hbLHLi&ipAddress=${this.state.ipInput}&domain=${this.state.domainInput}`)
    .then((response)=>{
      if (response.status === 200){
    return response.json()
    .then((data)=>{
      console.log(data);
      this.setState({location:data.location, ip:data.ip , isp:data.isp});
      this.createMap(data.location.lat, data.location.lng)
    })}
      else {
        throw new Error('bad response');
      }

  })
    .catch(()=>alert('Introduceti o adresa IP valabila'))
    
        
  }

  changeIp =(event)=>{
    this.setState({ipInput:event.target.value, domainInput:event.target.value})
  }
  getIpInfo =(event)=> {
    event.preventDefault();
    this.fetchData();
  }
  render(){
    return(
      <div className="app-container">
        <div className="header">
          <h1>IP Address Tracker</h1>
          <form onSubmit={this.getIpInfo}>
            <input type='text' onChange={this.changeIp} name="input" value={this.state.ipInput} placeholder="Search for any IP address or domain"></input>
           <button type='submit' className="submit" value=""><img src={arrow} alt="arrow"></img></button>
          </form>
          
        </div>
        <IpInfo location={this.state.location} ip={this.state.ip} isp={this.state.isp}/>
        <div id="mapid">
          
        </div>
      </div>
    )
  }

}
export default App;
