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
    appModel: PropTypes.object.isRequired,
  };

  onSiteSelect = async site => {
    const { appModel } = this.props;

    appModel.attrs.favouriteSite = site;
    await appModel.save();

    this.context.goBack();
  };

  render() {
    return (
      <Page id="sites-list">
        <Header title="Sites" />
        <Main onSiteSelect={this.onSiteSelect} {...this.props} />
      </Page>
    );
  }
}

export default index;
