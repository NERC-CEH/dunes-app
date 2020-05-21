import { observer } from 'mobx-react';
import React from 'react';
import { IonList } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
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
    const { date, comment, surveyors, location } = sample.attrs;

    const transect = (location || {}).name;
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
          <MenuAttrItem
            routerLink={`${baseURL}/transects`}
            value={transect}
            label="Transect"
            icon={locationOutline}
          />
        </IonList>
      </Main>
    );
  }
}

export default Component;
