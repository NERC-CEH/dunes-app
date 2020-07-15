import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonButton, NavContext } from '@ionic/react';
import { Page, Header } from '@apps';
import { withTranslation, Trans as T } from 'react-i18next';
import Main from './Main';

@observer
class Controller extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    sample: PropTypes.object.isRequired,
    subSample: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
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
      const navigateBack = e => {
        e.preventDefault();
        this.context.goBack();
      };
      return (
        <IonButton onClick={navigateBack}>
          <T>Finish</T>
        </IonButton>
      );
    }

    const nextSectionSampleId = nextSectionSample.cid;

    const navigateNextSubSample = e => {
      e.preventDefault();
      this.context.navigate(
        `${baseURL}/${nextSectionSampleId}`,
        'none',
        'replace'
      );
    };

    return (
      <IonButton onClick={navigateNextSubSample}>
        <T>Next</T>
      </IonButton>
    );
  };

  render() {
    const { match, sample, subSample, t } = this.props;
    const pointId = subSample.attrs.location.code.replace('S', '');
    const isDisabled = sample.isDisabled();
    const locationLabel = `${t('Quadrat')} #${pointId}`;

    return (
      <Page id="survey-plant-quadrat-transect-point-edit">
        <Header
          title={locationLabel}
          rightSlot={this.getNextPointButton()}
          skipTranslation
        />
        <Main
          sample={sample}
          subSample={subSample}
          baseURL={match.url}
          isDisabled={isDisabled}
        />
      </Page>
    );
  }
}

export default withTranslation()(Controller);
