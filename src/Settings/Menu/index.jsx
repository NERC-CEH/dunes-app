import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Log from 'helpers/log';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { Page, Header, toast } from '@apps';
import { Capacitor, Plugins, FilesystemDirectory } from '@capacitor/core';
import Main from './Main';

const { Filesystem } = Plugins;

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

async function clearCache(appModel) {
  if (!Capacitor.isNative) {
    return;
  }
  try {
    await Filesystem.rmdir({
      path: `cache`,
      directory: FilesystemDirectory.Data,
      recursive: true,
    });
  } catch (e) {
    // silent
  }
  appModel.attrs.locations = []; // eslint-disable-line no-param-reassign
  await appModel.save();

  success(t('Cache was cleared.'));
}

async function getCache() {
  if (!Capacitor.isNative) {
    return 0;
  }

  let cacheSize = 0;

  try {
    const { files } = await Filesystem.readdir({
      path: 'cache',
      directory: FilesystemDirectory.Data,
    });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // eslint-disable-next-line
      const { size } = await Filesystem.stat({
        path: `cache/${file}`,
        directory: FilesystemDirectory.Data,
      });

      cacheSize += size;
    }
  } catch (e) {
    // silent
  }

  return cacheSize;
}

const Container = observer(({ saveSamples, appModel, userModel, t }) => {
  const { sendAnalytics, language } = appModel.attrs;
  const [cache, setCache] = useState(0);

  useEffect(() => {
    (async () => {
      const cacheSize = await getCache();
      setCache(cacheSize);
    })();
  });

  const onClearCache = async () => {
    await clearCache(appModel);
    setCache(0);
  };

  return (
    <Page id="settings-menu">
      <Header title="Settings" />
      <Main
        resetApp={() => resetApp(saveSamples, appModel, userModel, t)}
        onToggle={(setting, checked) => onToggle(appModel, setting, checked)}
        sendAnalytics={sendAnalytics}
        language={language}
        cache={cache}
        clearCache={onClearCache}
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
