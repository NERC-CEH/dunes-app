import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { observer } from 'mobx-react';
import { IonButton, NavContext } from '@ionic/react';
import { Page, Header } from '@apps';
import { Trans as T } from 'react-i18next';
import Main from './Main';

@observer
class Controller extends React.Component {
  static contextType = NavContext;

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

    const onButtonClick = e => {
      e.preventDefault();

      subSample.metadata.completed = true;
      subSample.save();

      if (isLastSection) {
        this.context.goBack();
        return;
      }

      this.context.navigate(
        `${baseURL}/${nextSectionSample.cid}`,
        'none',
        'replace'
      );
    };

    return (
      <IonButton onClick={onButtonClick}>
        <T>Finish</T>
      </IonButton>
    );
  };

  render() {
    const { match, sample, subSample } = this.props;
    const locationLabel = subSample.getPrettyName();
    const isDisabled = sample.isDisabled();

    return (
      <Page id="survey-plant-quadrat-transect-point-edit">
        <Header
          title={locationLabel}
          rightSlot={this.getNextPointButton()}
          backButtonLabel={i18n.t('Back')}
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

export default Controller;
