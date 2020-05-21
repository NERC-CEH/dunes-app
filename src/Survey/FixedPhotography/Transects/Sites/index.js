import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Page, Header } from '@apps';
import { NavContext } from '@ionic/react';
import Main from './Main';

@observer
class index extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    match: PropTypes.object,
  };

  onSiteSelect = async site => {
    const { appModel } = this.props;

    appModel.attrs.favouriteSite = site;

    await appModel.save();
    this.context.goBack();
  };

  render() {
    const { sample, appModel, match } = this.props;

    return (
      <Page id="sites-list">
        <Header title="Sites" defaultHref="/home/user-surveys" />
        <Main
          sample={sample}
          appModel={appModel}
          onSiteSelect={this.onSiteSelect}
          match={match}
        />
      </Page>
    );
  }
}

export default index;
