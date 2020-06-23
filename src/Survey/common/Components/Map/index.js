import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Page, Header } from '@apps';
import { toJS } from 'mobx';
import Main from './Main';
import './styles.scss';

@observer
class Container extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
  };

  state = {};

  toggleGPStracking = on => {
    const { sample } = this.props;
    sample.toggleGPStracking(on);
  };

  render() {
    const { sample } = this.props;

    const location = toJS(sample.attrs.location || {});
    // const isGPSTracking = sample.isGPSRunning();

    return (
      <Page id="map">
        <Header title="Map" />
        <Main
          // isGPSTracking={isGPSTracking}
          location={location}
          setLocation={this.setLocation}
        />
      </Page>
    );
  }
}

export default Container;
