import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IonLifeCycleContext } from '@ionic/react';
import { Main } from '@apps';
// import { locate } from 'ionicons/icons';
import CONFIG from 'config';
import L from 'leaflet';
// import GPS from 'helpers/GPS';
import { Map, TileLayer } from 'react-leaflet';
import { observer } from 'mobx-react';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.imagePath = '/images/';

const DEFAULT_POSITION = [51.505, -0.09];
const DEFAULT_ZOOM = 5;
const DEFAULT_LOCATED_ZOOM = 16;

const parseCentroidSref = sref =>
  sref
    .replace(/[NE]/g, '')
    .split(' ')
    .map(parseFloat);

@observer
class MainMap extends Component {
  static contextType = IonLifeCycleContext;

  static propTypes = {
    location: PropTypes.object.isRequired,
    isGPSTracking: PropTypes.bool.isRequired,
  };

  state = {
    locating: false,
  };

  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  addLocationToMap(location) {
    const map = this.map.current.leafletElement;

    location.sections.forEach(section => {
      const postition = parseCentroidSref(section.centroid_sref);
      L.marker(postition).addTo(map);
    });

    const position = parseCentroidSref(location.centroid_sref);
    map.setView(position, DEFAULT_LOCATED_ZOOM);
  }

  componentDidMount() {
    const map = this.map.current.leafletElement;

    // correct map size after animation
    const { location } = this.props;

    this.context.onIonViewDidEnter(() => {
      map.whenReady(() => {
        map.invalidateSize();
        this.addLocationToMap(location);
      });
    });
  }

  // onGeolocate = async () => {
  //   if (this.state.locating) {
  //     this.stopGPS();
  //     return;
  //   }
  //   const location = await this.startGPS();
  //   const map = this.map.current.leafletElement;
  //   map.setView(
  //     new L.LatLng(location.latitude, location.longitude),
  //     DEFAULT_LOCATED_ZOOM
  //   );
  // };

  // startGPS = () => {
  //   return new Promise((resolve, reject) => {
  //     const options = {
  //       accuracyLimit: 160,

  //       onUpdate: () => {},

  //       callback: (error, location) => {
  //         this.stopGPS();

  //         if (error) {
  //           this.stopGPS();
  //           reject(error);
  //           return;
  //         }
  //         resolve(location);
  //       },
  //     };

  //     const locatingJobId = GPS.start(options);
  //     this.setState({ locating: locatingJobId });
  //   });
  // };

  // stopGPS = () => {
  //   GPS.stop(this.state.locating);
  //   this.setState({ locating: false });
  // };

  zoomToPolygonShape(polygon) {
    const map = this.map.current.leafletElement;
    const positions = polygon.coordinates[0].map(coordinates =>
      [...coordinates].reverse()
    );
    map.fitBounds(positions);
  }

  componentWillUnmount() {
    if (this.state.locating) {
      this.stopGPS();
    }
  }

  render() {
    const { isGPSTracking } = this.props;

    return (
      <Main className={`${isGPSTracking ? 'GPStracking' : ''}`}>
        <Map ref={this.map} zoom={DEFAULT_ZOOM} center={DEFAULT_POSITION}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/cehapps/cipqvo0c0000jcknge1z28ejp/tiles/256/{z}/{x}/{y}?access_token={accessToken}"
            accessToken={CONFIG.map.mapboxApiKey}
          />
        </Map>
      </Main>
    );
  }
}

export default MainMap;
