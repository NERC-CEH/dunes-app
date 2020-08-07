import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonButton, IonList, IonRouterLink } from '@ionic/react';
import {
  keyOutline,
  personOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Formik, Form } from 'formik';
import { Main, InputWithValidation } from '@apps';

class Component extends React.Component {
  state = {
    showPassword: false,
  };

  togglePassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const { showPassword } = this.state;
    const { onSubmit, schema } = this.props;

    return (
      <Main>
        <h1>
          <T>Welcome back</T>
        </h1>
        <h2>
          <T>Sign in to your account to start</T>
        </h2>

        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{}}
        >
          {props => (
            <Form>
              <IonList lines="full">
                <InputWithValidation
                  name="email"
                  placeholder="Email"
                  icon={personOutline}
                  type="email"
                  {...props}
                />
                <InputWithValidation
                  name="password"
                  placeholder="Password"
                  icon={keyOutline}
                  type={showPassword ? 'text' : 'password'}
                  {...props}
                >
                  <IonButton
                    slot="end"
                    onClick={this.togglePassword}
                    fill="clear"
                  >
                    <IonIcon
                      icon={showPassword ? eyeOutline : eyeOffOutline}
                      faint
                      size="small"
                    />
                  </IonButton>
                </InputWithValidation>
                <IonRouterLink
                  routerLink="/user/reset"
                  defaultHref="/user/register"
                  className="password-forgot-button"
                >
                  <T>Forgot password?</T>
                </IonRouterLink>
              </IonList>

              <IonButton color="primary" type="submit" expand="block">
                <T>Sign In</T>
              </IonButton>
            </Form>
          )}
        </Formik>
      </Main>
    );
  }
}

Component.propTypes = {
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Component;
