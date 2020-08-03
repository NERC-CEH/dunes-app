import React from 'react';
import { Section, Collapse } from '@apps';
// import survey from './config';
const survey = { label: 'Water Table Depth' };

const { P, H } = Section;

const Manual = () => (
  <>
    <Section>
      <H>Background</H>
      <P>
        The aim of this survey is to monitor water table depth in dune slacks
        (seasonal wetlands) within the sand dune system. Water table depth
        influences the type and health of dune slack vegetation and on species
        present like natterjack toads and many insects that also use dune slacks
        or damp sand.
      </P>
    </Section>

    <Section>
      <H>Method</H>
      <Collapse title="When and where to survey">
        <P>
          Water levels should be measured at least once per month at preselected
          dipwell locations.
        </P>
      </Collapse>

      <Collapse title="Equipment">
        <P>
          Take with you:
          <ul>
            <li>Handheld GPS unit</li>
            <li>Mobile phone app - transect locations downloaded beforehand</li>
            <li>Water-level measuring device (see notes)</li>
          </ul>
        </P>
      </Collapse>

      <Collapse title="Navigating to the dipwell locations">
        <P>
          Using your handheld GPS (and mobile phone app), navigate to each
          dipwell. The grid reference can be found on the description form for
          dipwell locations, or described on the app.
        </P>
      </Collapse>

      <Collapse title="What to record">
        <P>
          <ul>
            <li>
              If there is a cap on the dipwell, unscrew it or prise it off
              (depending on the type).
            </li>
            <li>
              If there is a datalogger suspended on a wire, carefully pull it
              out (When you have finished measuring the water level, slowly
              lower the logger back down the dipwell. DON’T drop it as this can
              cause the logger to malfunction).
            </li>
            <li>
              Using an appropriate water-level measuring device, measure from
              the top of the dipwell down to the water level.
            </li>
            <li>
              Record the value to the nearest cm. If the slack is flooded and
              the water level is above the dipwell, again measure to the top of
              the dipwell, but record this as a negative number. Note down the
              water level on the form, or on the app.
            </li>
            <li>
              Take a photograph of the dipwell, aligning it to the photograph on
              the dipwell information sheet, or on the app.
            </li>
          </ul>
        </P>
      </Collapse>
    </Section>
  </>
);

Manual.Header = () => <h3 className="manual-title">{survey.label}</h3>;

export default Manual;
