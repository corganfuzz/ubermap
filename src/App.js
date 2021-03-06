import React, {Component} from 'react';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';

// import ControlPanel from './control-panel';
// import CityPin from './city-pin';
// import CityInfo from './city-info';
//
// import CITIES from '../../data/cities.json';

const TOKEN = 'pk.eyJ1IjoibGlxdWlkZnV6eiIsImEiOiJjajg0dmtvaXIwYnduMzNxcHl2cDMyaTRqIn0.sfSI9XDqkdJX2zFlIRtEfw'; // Set your mapbox token here

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      },
      popupInfo: null
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }

  _renderCityMarker = (city, index) => {
    return (
      <Marker key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude} >
        {/* <CityPin size={20} onClick={() => this.setState({popupInfo: city})} /> */}
      </Marker>
    );
  }

  _renderPopup() {
    const {popupInfo} = this.state;

    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        onClose={() => this.setState({popupInfo: null})} >
        {/* <CityInfo info={popupInfo} /> */}
      </Popup>
    );
  }

  render() {

    const {viewport} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN} >
{/*
        { CITIES.map(this._renderCityMarker) } */}

        {this._renderPopup()}

        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>

        {/* <ControlPanel containerComponent={this.props.containerComponent} /> */}

      </MapGL>
    );
  }

}

// import React, { Component } from 'react';
// import MapGL from 'react-map-gl';
//
// // const style = {
// //   map: {
// //     width: "100%"
// //   }
// //
// // }
//
// class App extends Component {
//   render() {
//     return (
//       <div style={{width: '100vw', height: '100vh'}}>
//         <MapGL
//           width={750}
//           height={450}
//           latitude={37.768}
//           longitude={-122.331}
//           zoom={9.017}
//           mapStyle="mapbox://styles/mapbox/dark-v9"
//           mapboxApiAccessToken={
//             "pk.eyJ1IjoibGlxdWlkZnV6eiIsImEiOiJjajg0dmtvaXIwYnduMzNxcHl2cDMyaTRqIn0.sfSI9XDqkdJX2zFlIRtEfw"
//           }
//
//          />
//       </div>
//     );
//   }
// }
//
// export default App;
