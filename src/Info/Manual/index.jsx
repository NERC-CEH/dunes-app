import React from 'react';
import { Header, Page, Main, MenuItemModal } from '@apps';
import { Trans as T } from 'react-i18next';
import FixedPointPhotographyManual from 'Survey/FixedPhotography/Manual';
import ZonationMappingManual from 'Survey/ZonationMapping/Manual';
import DunesProfileManual from 'Survey/DunesProfile/Manual';
import PlantQuadratRecordingManual from 'Survey/PlantQuadrat/Manual';
import DipwellManual from 'Survey/Dipwell/Manual';
import DisturbanceManual from 'Survey/Disturbance/Manual';
import './styles.scss';

export default () => {
  return (
    <Page id="manual">
      <Header title="Manual" />

      <Main class="ion-padding">
        <div className="info-message">
          <p>
            <T>
              Find out how to conduct each of the activities that you can
              complete using this app.
            </T>
          </p>
        </div>

        <MenuItemModal
          label="Fixed-point Photography"
          header="Fixed-point Photography"
        >
          <FixedPointPhotographyManual />
        </MenuItemModal>

        <MenuItemModal label="Zonation Mapping" header="Zonation Mapping">
          <ZonationMappingManual />
        </MenuItemModal>

        <MenuItemModal label="Dunes Profile" header="Dunes Profile">
          <DunesProfileManual />
        </MenuItemModal>

        <MenuItemModal
          label="Plant Quadrat Recording"
          header="Plant Quadrat Recording"
        >
          <PlantQuadratRecordingManual />
        </MenuItemModal>

        <MenuItemModal label="Water Table Depth" header="Water Table Depth">
          <DipwellManual />
        </MenuItemModal>

        <MenuItemModal label="Disturbance / Other" header="Disturbance / Other">
          <DisturbanceManual />
        </MenuItemModal>
      </Main>
    </Page>
  );
};
