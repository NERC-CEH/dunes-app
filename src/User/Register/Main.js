import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonButton, IonList, IonRouterLink } from '@ionic/react';
import {
  personOutline,
  mailOutline,
  keyOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Formik, Form } from 'formik';
import { Main, InputWithValidation } from '@apps';

import config from 'config';

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
    const { onSubmit, schema, lang } = this.props;

    return (
      <Main>
        <h1>
          <T>Create a free account</T>
        </h1>

        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{}}
        >
          {props => (
            <Form>
              <IonList lines="full">
                <InputWithValidation
                  name="fullName"
                  placeholder="Full Name"
                  icon={personOutline}
                  type="text"
                  {...props}
                />
                <InputWithValidation
                  name="email"
                  placeholder="Email"
                  icon={mailOutline}
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

                <div className="terms-info-text">
                  <T>
                    By clicking Sign Up, you agree to our{' '}
                    <IonRouterLink
                      href={`${config.backend.url}/privacy-notice?lang=${lang}`}
                    >
                      Privacy Policy
                    </IonRouterLink>{' '}
                    and{' '}
                    <IonRouterLink
                      href={`${config.backend.url}/terms-of-use?lang=${lang}`}
                    >
                      Terms and Conditions
                    </IonRouterLink>
                  </T>
                </div>
              </IonList>

              <IonButton color="primary" type="submit" expand="block">
                <T>Sign Up</T>
              </IonButton>

              <div className="signin-button">
                <T>I am already a member</T>.{' '}
                <IonRouterLink routerLink="/user/login">
                  <T>Sign In</T>
                </IonRouterLink>
              </div>
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
  lang: PropTypes.string.isRequired,
};

export default Component;
