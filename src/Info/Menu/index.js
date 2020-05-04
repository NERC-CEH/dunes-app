import React from 'react';
import Header from 'Lib/Header';
import Page from 'Lib/Page';
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
