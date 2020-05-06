import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonButton, IonList, IonItem } from '@ionic/react';
import {
  keyOutline,
  personOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';
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
        <div className="info-message">
          <p>{t('Please sign in or register.')}</p>
        </div>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{}}
        >
          {props => (
            <Form>
              <IonList lines="full">
                <InputWithValidation
                  name="name"
                  placeholder={t('Username or email')}
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
              </IonList>

              <IonButton color="primary" type="submit" expand="block">
                {t('Sign in')}
              </IonButton>

              <IonList>
                <IonItem routerLink="/user/register" detail>
                  {t('Register')}
                </IonItem>
                <IonItem routerLink="/user/reset" detail>
                  {t('Forgot password?')}
                </IonItem>
              </IonList>
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
