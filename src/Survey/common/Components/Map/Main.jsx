import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IonLifeCycleContext, IonIcon, IonSpinner } from '@ionic/react';
import { Main } from '@apps';
import { locateOutline } from 'ionicons/icons';
import CONFIG from 'config';
import L from 'leaflet';
import GPS from 'helpers/GPS';
import { Map, TileLayer } from 'react-leaflet';
import LeafletControl from 'react-leaflet-control';
import { observer } from 'mobx-react';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.imagePath = '/images/';

const DEFAULT_POSITION = [51.505, -0.09];
const DEFAULT_ZOOM = 5;
const DEFAULT_LOCATED_ZOOM = 16;

@observer
class MainMap extends Component {
  static contextType = IonLifeCycleContext;

  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  state = {
    locating: false,
  };

  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  addLocationToMap(locationGroup) {
    const map = this.map.current.leafletElement;

    const locationCoords = locationGroup.locations.map(location => [
      location.latitude,
      location.longitude,
    ]);

    // add markers
    locationCoords.forEach((position, index) => {
      const marker = L.marker(position);
      const { name } = locationGroup.locations[index];
      name && marker.bindPopup(name);
      marker.addTo(map);
    });

    // add joining line
    const isTransectType = locationGroup.geom;
    if (isTransectType) {
      L.polyline(locationCoords, { color: 'var(--ion-color-danger)' }).addTo(
        map
      );
    }

    const position = [locationGroup.latitude, locationGroup.longitude];
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

  onGeolocate = async () => {
    if (this.state.locating) {
      this.stopGPS();
      return;
    }

    this.trackGPS();
  };

  updateCurrentPositionMarker = location => {
    const position = [location.latitude, location.longitude];
    const map = this.map.current.leafletElement;

    if (!this.currentPositionMarker) {
      this.currentPositionMarker = L.circleMarker(position, {
        color: 'white',
        fillColor: '#00a0a4',
        fillOpacity: 1,
        weight: 4,
      });
      this.currentPositionMarker.addTo(map);
    } else {
      this.currentPositionMarker.setLatLng(position);
    }

    map.setView(
      new L.LatLng(location.latitude, location.longitude),
      map.getZoom()
    );
  };

  trackGPS = () => {
    const options = {
      accuracyLimit: 160,

      onUpdate: () => {},

      callback: (error, location) => {
        if (error) {
          return;
        }
        this.updateCurrentPositionMarker(location);
      },
    };

    const locatingJobId = GPS.start(options);
    this.setState({ locating: locatingJobId });
  };

  stopGPS = () => {
    GPS.stop(this.state.locating);
    this.setState({ locating: false });
  };

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
    return (
      <Main>
        <Map ref={this.map} zoom={DEFAULT_ZOOM} center={DEFAULT_POSITION}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/cehapps/cipqvo0c0000jcknge1z28ejp/tiles/256/{z}/{x}/{y}?access_token={accessToken}"
            accessToken={CONFIG.map.mapboxApiKey}
          />

          <LeafletControl position="topright">
            <button onClick={this.onGeolocate} className="geolocate-btn">
              {this.state.locating ? (
                <IonSpinner color="primary" />
              ) : (
                <IonIcon icon={locateOutline} mode="md" size="large" />
              )}
            </button>
          </LeafletControl>
        </Map>
      </Main>
    );
  }
}

export default MainMap;
