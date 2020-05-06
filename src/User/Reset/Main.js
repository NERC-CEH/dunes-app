import React from 'react';
import PropTypes from 'prop-types';
import { IonButton, IonList } from '@ionic/react';
import { Main, InputWithValidation } from '@apps';
import { personOutline } from 'ionicons/icons';
import { Formik, Form } from 'formik';

const Component = ({ onSubmit, schema }) => {
  return (
    <Main>
      <div className="info-message">
        <p>
          {t(
            'Enter your username or email address to request a password reset.'
          )}
        </p>
      </div>
      <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{}}>
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
            </IonList>

            <IonButton color="primary" type="submit" expand="block">
              {t('Reset')}
            </IonButton>
          </Form>
        )}
      </Formik>
    </Main>
  );
};

Component.propTypes = {
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Component;
