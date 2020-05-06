import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonButton, IonList } from '@ionic/react';
import {
  personOutline,
  mailOutline,
  keyOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';
import { Formik, Form } from 'formik';
import { Main, ToggleWithValidation, InputWithValidation } from '@apps';

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
                  placeholder={t('Email')}
                  icon={mailOutline}
                  type="email"
                  {...props}
                />
                <InputWithValidation
                  name="firstname"
                  placeholder={t('First Name')}
                  icon={personOutline}
                  type="text"
                  {...props}
                />
                <InputWithValidation
                  name="secondname"
                  placeholder={t('Surname')}
                  icon={personOutline}
                  type="text"
                  {...props}
                />
                <InputWithValidation
                  name="password"
                  placeholder={t('Password')}
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
                <ToggleWithValidation
                  name="terms"
                  label={(
                    <>
                      {t('I agree to')}{' '}
                      <a
                        href={`${config.site_url}/privacy-notice?lang=${lang}`}
                      >
                        {t('Terms and Conditions')}
                      </a>
                    </>
                  )}
                  icon={lockClosedOutline}
                  type="terms"
                  {...props}
                />
              </IonList>

              <IonButton color="primary" type="submit" expand="block">
                {t('Register')}
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
  lang: PropTypes.string.isRequired,
};

export default Component;
