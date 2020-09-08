import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Main, RadioInput, InfoBackgroundMessage } from '@apps';
import { IonList } from '@ionic/react';

@observer
class Sites extends React.Component {
  static propTypes = {
    appModel: PropTypes.object.isRequired,
    onSiteSelect: PropTypes.func.isRequired,
  };

  onLocationSelect = async selectedId => {
    const { appModel, onSiteSelect } = this.props;

    const { sites } = appModel.attrs;

    const selectedLocation = sites.find(
      ({ location_id: id }) => id === selectedId
    );

    onSiteSelect(selectedLocation);
  };

  render() {
    const { appModel } = this.props;
    const { sites } = appModel.attrs;
    const { favouriteSite } = appModel.attrs;

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
          currentValue={favouriteSite.location_id} // eslint-disable-line
          skipTranslation
        />
      </Main>
    );
  }
}

export default Sites;
