import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Page, Header } from '@apps';
import Main from './Main';

@observer
class Controller extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
  };

  render() {
    // const { sample } = this.props;
    // const isDisabled = sample.isDisabled();

    return (
      <Page id="survey-fixed-photography-transect-edit">
        <Header title="Location" />
        <Main {...this.props} />
      </Page>
    );
  }
}

export default Controller;
