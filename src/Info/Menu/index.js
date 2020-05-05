import React from 'react';
import { Header, Page } from '@apps';
import Main from './Main';

const Component = () => {
  return (
    <Page>
      <Header title={t('Menu')} />
      <Main />
    </Page>
  );
};

export default Component;
