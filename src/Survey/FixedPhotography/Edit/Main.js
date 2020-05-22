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
    match: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
  };

  render() {
    const { sample, isDisabled, match } = this.props;

    const survey = sample.getSurvey();
    const { date, comment, surveyors, location } = sample.attrs;

    const transect = (location || {}).name;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            routerLink={`${match.url}/surveyors`}
            disabled={isDisabled}
            value={surveyors}
            {...survey.attrs.surveyors}
          />
          <MenuAttrItem
            routerLink={`${match.url}/date`}
            disabled={isDisabled}
            value={dateHelp.print(date)}
            {...survey.attrs.date}
          />
          <MenuAttrItem
            routerLink={`${match.url}/comment`}
            disabled={isDisabled}
            value={comment}
            {...survey.attrs.comment}
          />
          <MenuAttrItem
            routerLink={`${match.url}/transects`}
            value={transect}
            label="Location"
            icon={locationOutline}
            wrapText
          />
        </IonList>
      </Main>
    );
  }
}

export default Component;
