import React from 'react';
import { observer } from 'mobx-react';
import { Page, Header } from '@apps';
import PropTypes from 'prop-types';
import Main from './Main';

@observer
class Controller extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
  };

  render() {
    const { sample } = this.props;
    const isDisabled = sample.isDisabled();

    return (
      <Page id="survey-plant-quadrat-transect-edit">
        <Header title="Location" />
        <Main {...this.props} isDisabled={isDisabled} />
      </Page>
    );
  }
}

export default Controller;
