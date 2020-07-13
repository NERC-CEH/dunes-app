import React from 'react';
import { observer } from 'mobx-react';
import { Page, Header } from '@apps';
import Component from './Main';
import './styles.scss';

@observer
class Controller extends React.Component {
  static propTypes = {};

  render() {
    return (
      <Page id="survey-dunes-profile-transect-edit">
        <Header title="Location" />
        <Component {...this.props} />
      </Page>
    );
  }
}

export default Controller;
