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
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    userModel: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  state = { refreshing: false };

  onSiteSelect = async site => {
    const { appModel, sample } = this.props;

    appModel.attrs.favouriteSite = site;
    appModel.attrs.locations = [];
    await appModel.save();

    sample.metadata.site = site;
    delete sample.attrs.location;
    await sample.save();

    this.context.goBack();
  };

  refreshData = async () => {
    if (this.state.refreshing) {
      return;
    }

    const { userModel, appModel, t } = this.props;

    if (!device.isOnline()) {
      warn(t("Sorry, looks like you're offline."));
      return;
    }

    const isLoggedIn = !!userModel.attrs.id;
    if (!isLoggedIn) {
      warn(t('Please log in to refresh the data.'));
      return;
    }

    if (!userModel.attrs.verified) {
      await loader.show({
        message: t('Please wait...'),
      });

      try {
        await userModel.refreshProfile();
      } catch (e) {
        // do nothing
      }

      loader.hide();

      if (!userModel.attrs.verified) {
        warn(t("Sorry, your account hasn't been verified yet or is blocked."));
        return;
      }
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

  cancelSelectedLocation = () => {
    this.context.goBack();
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
        <Main
          onSiteSelect={this.onSiteSelect}
          cancelSelectedLocation={this.cancelSelectedLocation}
          {...this.props}
        />
      </Page>
    );
  }
}

export default withTranslation()(index);
