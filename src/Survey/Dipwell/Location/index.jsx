import React from 'react';
import { observer } from 'mobx-react';
import { Page, Header } from '@apps';
import Main from './Main';

@observer
class Controller extends React.Component {
  static propTypes = {};

  render() {
    return (
      <Page id="survey-dipwell-transect-edit">
        <Header title="Location" />
        <Main {...this.props} />
      </Page>
    );
  }
}

export default Controller;
