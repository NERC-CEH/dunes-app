import React from 'react';
import PropTypes from 'prop-types';
import Log from 'helpers/log';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { Page, Header, toast } from '@apps';
import Main from './Main';

const { success, error } = toast;

async function resetApp(saveSamples, appModel, userModel, t) {
  Log('Settings:Menu:Controller: resetting the application!', 'w');
  try {
    await appModel.resetDefaults();
    await userModel.resetDefaults();
    await saveSamples.resetDefaults();

    success(t('Done'));
  } catch (e) {
    error(`${e.message}`);
  }
}

function onToggle(appModel, setting, checked) {
  Log('Settings:Menu:Controller: setting toggled.');
  appModel.attrs[setting] = checked; // eslint-disable-line no-param-reassign
  appModel.save();
}

const Container = observer(({ saveSamples, appModel, userModel, t }) => {
  const { sendAnalytics, language } = appModel.attrs;

  return (
    <Page id="settings-menu">
      <Header title="Settings" />
      <Main
        resetApp={() => resetApp(saveSamples, appModel, userModel, t)}
        onToggle={(setting, checked) => onToggle(appModel, setting, checked)}
        sendAnalytics={sendAnalytics}
        language={language}
      />
    </Page>
  );
});

Container.propTypes = {
  appModel: PropTypes.object.isRequired,
  userModel: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Container);
