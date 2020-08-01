import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Page, Header, loader, device, toast } from '@apps';
import { NavContext, IonButton } from '@ionic/react';
import { Trans as T, withTranslation } from 'react-i18next';
import Main from './Main';

const { success, error, warn } = toast;

@observer
class index extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    appModel: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  state = { refreshing: false };

  onSiteSelect = async site => {
    const { appModel } = this.props;

    appModel.attrs.favouriteSite = site;
    await appModel.save();

    this.context.goBack();
  };

  refreshData = async () => {
    if (this.state.refreshing) {
      return;
    }

    const { appModel, t } = this.props;

    if (!device.isOnline()) {
      warn(t("Sorry, looks like you're offline."));
      return;
    }

    this.setState({ refreshing: true });

    await loader.show({
      message: t('Please wait...'),
    });

    try {
      await appModel.updateSites();

      success(t('List was successfully updated.'));
    } catch (e) {
      error(e.message);
    }

    this.setState({ refreshing: false });
    await loader.hide();
  };

  componentDidMount = () => {
    const { appModel } = this.props;
    if (!appModel.attrs.sites.length && device.isOnline()) {
      this.refreshData();
    }
  };

  render() {
    const refreshButton = (
      <IonButton onClick={this.refreshData}>
        <T>Refresh</T>
      </IonButton>
    );

    return (
      <Page id="sites-list">
        <Header
          title="Sites"
          rightSlot={refreshButton}
          defaultHref="/home/user-surveys"
        />
        <Main onSiteSelect={this.onSiteSelect} {...this.props} />
      </Page>
    );
  }
}

export default withTranslation()(index);
