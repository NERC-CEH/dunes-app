import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import { Main, RadioInput, alert } from '@apps';
import { IonList } from '@ionic/react';
import { Trans as T } from 'react-i18next';

function showChangeLocationConfirmationDialog() {
  return new Promise(resolve => {
    alert({
      header: 'Changing location',
      message: (
        <T>
          Warning - This will discard some of the survey information you have
          entered so far.
        </T>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => resolve(false),
        },
        {
          text: 'Discard',
          cssClass: 'primary',
          handler: () => resolve(true),
        },
      ],
    });
  });
}

@observer
class Sites extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    onSiteSelect: PropTypes.func.isRequired,
    cancelSelectedLocation: PropTypes.func.isRequired,
  };

  onLocationSelect = async selectedId => {
    const {
      sample,
      appModel,
      onSiteSelect,
      cancelSelectedLocation,
    } = this.props;
    const { sites } = appModel.attrs;

    if (sample.metadata.site && sample.metadata.site.location_id) {
      const change = await showChangeLocationConfirmationDialog();

      if (!change) {
        cancelSelectedLocation();
        return;
      }

      while (sample.samples.length) {
        const subSample = sample.samples.pop();
        await subSample.destroy(); //eslint-disable-line
      }
    }

    const selectedLocation = sites.find(
      ({ location_id: id }) => id === selectedId
    );

    onSiteSelect(selectedLocation);
  };

  render() {
    const { sample, appModel } = this.props;
    const { sites } = appModel.attrs;
    const { site } = sample.metadata;

    const hasData = !!sites.length;
    if (!hasData) {
      return (
        <Main>
          <IonList lines="full">
            <InfoBackgroundMessage>
              You don't have any sites. Please try to refresh the list.
            </InfoBackgroundMessage>
          </IonList>
        </Main>
      );
    }

    const options = sites.map(s => {
      return {
        label: s.name,
        value: s.location_id,
      };
    });

    return (
      <Main>
        <RadioInput
          values={options}
          onChange={this.onLocationSelect}
          currentValue={site.location_id}
          skipTranslation
        />
      </Main>
    );
  }
}

export default Sites;
