import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavContext } from '@ionic/react';
import Log from 'helpers/log';
import { toast, loader, Page, Header, device } from '@apps';
import Main from './Main';
import './styles.scss';

const { success, warn, error } = toast;

async function onLogin(userModel, details, onSuccess) {
  const { email, password } = details;

  if (!device.isOnline()) {
    warn(t("Sorry, looks like you're offline."));
    return;
  }

  await loader.show({
    message: t('Please wait...'),
  });

  try {
    await userModel.logIn(email.trim(), password);

    onSuccess();
  } catch (err) {
    Log(err, 'e');
    error(t(err.message));
  }

  loader.hide();
}

function LoginContainer({ userModel, onSuccess }) {
  const context = useContext(NavContext);
  const onSuccessReturn = () => {
    onSuccess && onSuccess();

    const { email } = userModel.attrs;
    success(`${t('Successfully logged in as')}: ${email}`);
    context.navigate('/home/info', 'root');
  };

  return (
    <Page id="user-login">
      <Header className="ion-no-border" routerDirection="none" />
      <Main
        schema={userModel.loginSchema}
        onSubmit={details => onLogin(userModel, details, onSuccessReturn)}
      />
    </Page>
  );
}

LoginContainer.propTypes = {
  userModel: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

export default LoginContainer;
