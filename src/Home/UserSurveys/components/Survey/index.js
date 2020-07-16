import React from 'react';
import PropTypes from 'prop-types';
import { alert } from '@apps';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonBadge,
  IonAvatar,
  IonIcon,
} from '@ionic/react';
import OnlineStatus from './components/OnlineStatus';
import ErrorMessage from './components/ErrorMessage';
import './styles.scss';

function deleteSurvey(sample) {
  alert({
    header: 'Delete',
    message: <T>Are you sure you want to delete this survey?</T>,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'primary',
      },
      {
        text: 'Delete',
        cssClass: 'secondary',
        handler: () => sample.destroy(),
      },
    ],
  });
}

const Survey = observer(({ sample, t }) => {
  const date = new Date(sample.metadata.created_on);
  const prettyDate = date.toLocaleDateString();

  const survey = sample.getSurvey();
  const href = `/survey/${survey.name}/${sample.cid}/edit`;
  const isDisabled = sample.remote.synchronising;

  function getSampleInfo() {
    return (
      <>
        <IonAvatar>
          <IonIcon icon={survey.icon} />
        </IonAvatar>

        <IonLabel class="ion-text-wrap">
          <h3>
            <b>
              <T>{survey.label}</T>
            </b>
          </h3>
          <h3>{prettyDate}</h3>
          <IonBadge color="medium" />
        </IonLabel>
      </>
    );
  }

  return (
    <IonItemSliding class="survey-list-item">
      <ErrorMessage sample={sample} />
      <IonItem routerLink={href} disabled={isDisabled}>
        {getSampleInfo()}
        <OnlineStatus sample={sample} />
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => deleteSurvey(sample, t)}>
          <T>Delete</T>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
});

Survey.propTypes = {
  sample: PropTypes.object.isRequired,
};

export default Survey;
