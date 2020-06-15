import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavContext } from '@ionic/react';
import Log from 'helpers/log';
import { Page, Header, device, alert, loader, toast } from '@apps';
import Main from './Main';
import './styles.scss';

const { warn, error } = toast;

async function onSubmit(userModel, details, onSuccess) {
  const { email } = details;
  if (!device.isOnline()) {
    warn(t("Sorry, looks like you're offline."));
    return;
  }
  await loader.show({
    message: t('Please wait...'),
  });

  try {
    await userModel.reset(email.trim());
    alert({
      header: t("We've sent an email to you"),
      message: t(
        "Click the link in the email to reset your password. If you don't see the email, check other places like your junk, spam or other folders."
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

export default function Container({ userModel }) {
  const context = useContext(NavContext);

  const onSuccess = () => {
    context.navigate('/home/info', 'root');
  };

  return (
    <Page id="user-reset">
      <Header
        className="ion-no-border"
        routerDirection="none"
        defaultHref="/user/login"
      />
      <Main
        schema={userModel.resetSchema}
        onSubmit={details => onSubmit(userModel, details, onSuccess)}
      />
    </Page>
  );
}

Container.propTypes = {
  userModel: PropTypes.object.isRequired,
};
