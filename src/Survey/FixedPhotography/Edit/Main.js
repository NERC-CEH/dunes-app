import { observer } from 'mobx-react';
import React from 'react';
import { IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Main, MenuAttrItem, date as dateHelp } from '@apps';
import PropTypes from 'prop-types';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    baseURL: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
  };

  render() {
    const { sample, isDisabled, baseURL } = this.props;

    const survey = sample.getSurvey();
    const { date, comment, surveyors } = sample.attrs;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            routerLink={`${baseURL}/surveyors`}
            disabled={isDisabled}
            value={surveyors}
            {...survey.attrs.surveyors}
          />
          <MenuAttrItem
            routerLink={`${baseURL}/date`}
            disabled={isDisabled}
            value={dateHelp.print(date)}
            {...survey.attrs.date}
          />
          <MenuAttrItem
            routerLink={`${baseURL}/comment`}
            disabled={isDisabled}
            value={comment}
            {...survey.attrs.comment}
          />
          <IonItem routerLink={`${baseURL}/transects`} detail>
            <IonIcon slot="start" icon={locationOutline} />
            <IonLabel>
              <T>Transects</T>
            </IonLabel>
          </IonItem>
        </IonList>
      </Main>
    );
  }
}

export default Component;
