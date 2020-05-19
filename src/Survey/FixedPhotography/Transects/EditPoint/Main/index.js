import { observer } from 'mobx-react';
import React from 'react';
import { IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
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

    return (
      <Main>
        <IonList lines="full">
          <IonItem>
            <IonIcon slot="start" icon={locateOutline} />
            <IonLabel className="ion-text-wrap point-location-name">
              <IonLabel position="stacked">
                <b>{subSample.attrs.location.name}</b>
              </IonLabel>
              <IonLabel position="stacked" className="ion-text-wrap">
                {subSample.attrs.location.centroid_sref}
              </IonLabel>
            </IonLabel>
          </IonItem>

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
