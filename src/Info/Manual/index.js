import React from 'react';
import { Header, Page, Main } from '@apps';
import './styles.scss';
import FixedPointPhotographyManual from 'Survey/FixedPhotography/Manual';

export default () => (
  <Page id="manual">
    <Header title="Manual" />
    <Main class="ion-padding">
      <FixedPointPhotographyManual.Header />
      <FixedPointPhotographyManual />
    </Main>
  </Page>
);
