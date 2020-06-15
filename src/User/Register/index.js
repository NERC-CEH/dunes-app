import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Log from 'helpers/log';
import { NavContext } from '@ionic/react';
import { Page, Header, device, toast, alert, loader } from '@apps';
import Main from './Main';
import './styles.scss';

const { warn, error } = toast;

async function onRegister(userModel, details, lang, onSuccess) {
  const email = details.email.trim();
  const { password, fullName } = details;
  const otherDetails = {
    field_full_name: [{ value: fullName.trim() }],
  };

  if (!device.isOnline()) {
    warn(t("Sorry, looks like you're offline."));
    return;
  }
  await loader.show({
    message: t('Please wait...'),
  });

  try {
    await userModel.register(email, password, otherDetails);

    userModel.attrs.fullName = fullName; // eslint-disable-line
    userModel.save();

    alert({
      header: t('Welcome aboard!'),
      message: t(
        'Before submitting any records please check your email and click on the verification link.'
      ),
      buttons: [
        {
          text: t('OK, got it'),
          role: 'cancel',
          handler: onSuccess,
        },
      ],
    });
  } catch (err) {
    Log(err, 'e');
    error(t(err.message));
  }

  loader.hide();
}

export default function RegisterContainer({ userModel, appModel }) {
  const lang = appModel.attrs.language;
  const context = useContext(NavContext);

  const onSuccess = () => {
    context.navigate('/home/info', 'root');
  };

  return (
    <Page id="user-register">
      <Header className="ion-no-border" />
      <Main
        schema={userModel.registerSchema}
        onSubmit={details => onRegister(userModel, details, lang, onSuccess)}
        lang={lang}
      />
    </Page>
  );
}

RegisterContainer.propTypes = {
  userModel: PropTypes.object.isRequired,
  appModel: PropTypes.object.isRequired,
};
