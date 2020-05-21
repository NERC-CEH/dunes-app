import { observer } from 'mobx-react';
import React from 'react';
import locationHelp from 'common/helpers/location';
import { IonList } from '@ionic/react';
import { locateOutline } from 'ionicons/icons';
import { Main, MenuAttrItem } from '@apps';
import PropTypes from 'prop-types';
import './styles.scss';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    subSample: PropTypes.object.isRequired,
    baseURL: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
  };

  render() {
    const { subSample, isDisabled, baseURL } = this.props;

    const survey = subSample.getSurvey();
    const { disturbance } = subSample.attrs;

    const [
      latitude,
      longitude,
    ] = subSample.attrs.location.centroid_sref.replace(/[N,W]/g, '').split(' ');
    const gridRef = locationHelp.locationToGrid({
      accurracy: 1,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            value={gridRef}
            icon={locateOutline}
            label="Grid Ref"
            disabled
          />
          <MenuAttrItem
            routerLink={`${baseURL}/disturbance`}
            disabled={isDisabled}
            value={disturbance}
            {...survey.attrs.disturbance}
          />
        </IonList>
      </Main>
    );
  }
}

export default Component;
