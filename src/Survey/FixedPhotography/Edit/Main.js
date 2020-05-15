import { observer } from 'mobx-react';
import React from 'react';
import { IonList } from '@ionic/react';
import { Main, MenuAttrItem, date as dateHelp } from '@apps';
import { calendarOutline, chatboxOutline, peopleOutline } from 'ionicons/icons';
import PropTypes from 'prop-types';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
  };

  render() {
    const { sample, isDisabled } = this.props;

    const baseURL = `/survey/fixed-photography/${sample.cid}/edit`;
    const { date, comment, surveyors } = sample.attrs;

    return (
      <Main>
        <IonList lines="full">
          <MenuAttrItem
            routerLink={`${baseURL}/surveyors`}
            disabled={isDisabled}
            icon={peopleOutline}
            label="Surveyors"
            value={surveyors}
          />
          <MenuAttrItem
            routerLink={`${baseURL}/date`}
            disabled={isDisabled}
            icon={calendarOutline}
            label="Date"
            value={dateHelp.print(date)}
          />
          <MenuAttrItem
            routerLink={`${baseURL}/comment`}
            disabled={isDisabled}
            icon={chatboxOutline}
            label="Notes"
            value={comment}
          />
        </IonList>
      </Main>
    );
  }
}

export default Component;
