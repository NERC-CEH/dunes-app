import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import i18n from 'i18next';
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
    const { sample, subSample } = this.props;
    const isDisabled = sample.isDisabled();
    const locationLabel = subSample.getPrettyName();

    return (
      <Page id="survey-fixed-photography-transect-point-edit">
        <Header
          skipTranslation
          title={locationLabel}
          backButtonLabel={i18n.t('Back')}
          rightSlot={this.getNextPointButton()}
        />
        <Main sample={sample} subSample={subSample} isDisabled={isDisabled} />
      </Page>
    );
  }
}

export default Controller;
