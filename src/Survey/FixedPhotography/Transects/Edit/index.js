import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Page, Header } from '@apps';
import Main from './Main';

@observer
class Controller extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    match: PropTypes.object,
  };

  render() {
    const { match, sample, appModel } = this.props;

    return (
      <Page id="survey-fixed-photography-transect-edit">
        <Header title="Transect" defaultHref="/home/user-surveys" />
        <Main sample={sample} appModel={appModel} baseURL={match.url} />
      </Page>
    );
  }
}

export default Controller;
