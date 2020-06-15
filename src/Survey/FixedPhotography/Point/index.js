import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonButton } from '@ionic/react';
import { Page, Header } from '@apps';
import { Trans as T } from 'react-i18next';
import Main from './Main';

@observer
class Controller extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    subSample: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object.isRequired,
  };

  getNextPointButton = () => {
    const { sample, subSample, location } = this.props;

    const baseURL = location.pathname.replace(
      /edit\/location\/.*/g,
      `edit/location`
    );

    const currentSectionIndex = sample.samples.findIndex(
      ({ cid }) => cid === subSample.cid
    );

    const nextSectionIndex = currentSectionIndex + 1;
    const nextSectionSample = sample.samples[nextSectionIndex];
    const isLastSection = !nextSectionSample;

    if (isLastSection) {
      return (
        <IonButton routerLink={baseURL} routerDirection="back">
          <T>Finish</T>
        </IonButton>
      );
    }

    const nextSectionSampleId = nextSectionSample.cid;

    return (
      <IonButton
        routerLink={`${baseURL}/${nextSectionSampleId}`}
        routerDirection="root"
      >
        <T>Next</T>
      </IonButton>
    );
  };

  render() {
    const { match, sample, subSample } = this.props;
    const pointId = subSample.attrs.location.code.replace('S', '');

    return (
      <Page id="survey-fixed-photography-transect-point-edit">
        <Header
          title={`Point #${pointId}`}
          defaultHref="/home/user-surveys"
          rightSlot={this.getNextPointButton()}
        />
        <Main sample={sample} subSample={subSample} baseURL={match.url} />
      </Page>
    );
  }
}

export default Controller;
