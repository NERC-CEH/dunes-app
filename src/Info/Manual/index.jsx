import React from 'react';
import { Header, Page, Main } from '@apps';
import FixedPointPhotographyManual from 'Survey/FixedPhotography/Manual';
import ZonationMappingManual from 'Survey/ZonationMapping/Manual';
import DunesProfileManual from 'Survey/DunesProfile/Manual';
import PlantQuadratRecordingManual from 'Survey/PlantQuadrat/Manual';
import DipwellManual from 'Survey/Dipwell/Manual';
import DisturbanceManual from 'Survey/Disturbance/Manual';
import './styles.scss';

export default () => (
  <Page id="manual">
    <Header title="Manual" />
    <Main class="ion-padding">
      <FixedPointPhotographyManual.Header />
      <FixedPointPhotographyManual />

      <ZonationMappingManual.Header />
      <ZonationMappingManual />

      <DunesProfileManual.Header />
      <DunesProfileManual />

      <PlantQuadratRecordingManual.Header />
      <PlantQuadratRecordingManual />

      <DipwellManual.Header />
      <DipwellManual />

      <DisturbanceManual.Header />
      <DisturbanceManual />
    </Main>
  </Page>
);
