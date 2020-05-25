import React from 'react';
import PropTypes from 'prop-types';
import { IonButton, IonList } from '@ionic/react';
import { Main, InputWithValidation } from '@apps';
import { personOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Formik, Form } from 'formik';

const Component = ({ onSubmit, schema }) => {
  return (
    <Main>
      <h2>
        <T>Enter your email address to request a password reset.</T>
      </h2>

      <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{}}>
        {props => (
          <Form>
            <IonList lines="full">
              <InputWithValidation
                name="name"
                placeholder="Email"
                icon={personOutline}
                type="text"
                {...props}
              />
            </IonList>

            <IonButton color="primary" type="submit" expand="block">
              <T>Reset</T>
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
