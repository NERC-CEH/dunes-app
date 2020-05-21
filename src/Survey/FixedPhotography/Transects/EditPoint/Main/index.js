import { observer } from 'mobx-react';
import React from 'react';
import locationHelp from 'common/helpers/location';
import { IonList } from '@ionic/react';
import { locateOutline } from 'ionicons/icons';
import { Main, MenuAttrItem } from '@apps';
import PhotoPicker from 'Components/PhotoPickerFooter';
import PropTypes from 'prop-types';
import './styles.scss';

@observer
class Component extends React.Component {
  static propTypes = {
    subSample: PropTypes.object.isRequired,
    // baseURL: PropTypes.string.isRequired,
    // isDisabled: PropTypes.bool,
  };

  render() {
    const { subSample } = this.props;

    // const survey = subSample.getSurvey();
    // const { disturbance } = subSample.attrs;

    const [
      latitude,
      longitude,
    ] = subSample.attrs.location.centroid_sref.replace(/[N,W]/g, '').split(' ');
    const gridRef = locationHelp.locationToGrid({
      accurracy: 1,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    const prettyGridRef = locationHelp.prettyPrintGridRef(gridRef);

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            value={prettyGridRef}
            icon={locateOutline}
            label="Grid Ref"
            disabled
            className="point-location-gridref"
          />
          {/* <MenuAttrItem
            routerLink={`${baseURL}/disturbance`}
            disabled={isDisabled}
            value={disturbance}
            {...survey.attrs.disturbance}
          /> */}
          {/* <div className="info-message">
            <p>
              <T>Please add a photo below.</T>
            </p>
          </div> */}
          <PhotoPicker model={subSample} />
        </IonList>
      </Main>
    );
  }
}

export default Component;
