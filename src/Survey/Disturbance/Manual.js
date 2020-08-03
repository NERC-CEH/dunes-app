import React from 'react';
import { Section, Collapse } from '@apps';
// import survey from './config';
const survey = { label: 'Disturbance' };

const { P, H } = Section;

const Manual = () => (
  <>
    <Section>
      <H>Background</H>
      <P>
        The aim of this survey is to monitor signs of disturbance, damage or
        other aspects around the site. Disturbance can be considered good or bad
        depending on what is happening and where. For example, some disturbance
        can be useful to maintain areas of bare sand. It covers disturbance by
        animals and from human activities.
      </P>
    </Section>

    <Section>
      <H>Method</H>
      <Collapse title="When and where to survey">
        <P>Disturbance can be recorded at any time, anywhere on the site.</P>
      </Collapse>

      <Collapse title="Equipment">
        <P>
          Take with you:
          <ul>
            <li>Handheld GPS unit</li>
            <li>Mobile phone app - transect locations downloaded beforehand</li>
          </ul>
        </P>
      </Collapse>

      <Collapse title="Navigating to locations">
        <P>
          There are no pre-set locations, but you may want to visit particular
          areas to follow up previous reports of disturbance or points of
          interest. These can be obtained by discussing with the site manager.
        </P>
      </Collapse>

      <Collapse title="What to record">
        <P>
          If you wish to record some disturbance or other feature on the site,
          use the recording form, or the app activity. This covers the following
          aspects:
          <ul>
            <li>
              The presence and size of patches of bare sand, or where the turf
              has been broken up by activity of animals or people.
            </li>
            <li>
              Presence of animal dung, and if possible an indication of which
              animal it is from (rabbits, ponies, cattle, sheep, other).
            </li>
            <li>Rabbit activity (small feeding scrapes, burrows).</li>
            <li>
              Human activities such as damage from vehicle tracks (including
              motorbikes), litter or flytipping. Recording litter is not aimed
              at the occasional sweet wrapper, but things like remains of a
              barbeque, multiple cans/bottles left by visitors, large rubbish
              items like car tyres, etc. should be recorded.
            </li>
            <li>
              Any other aspects can be recorded using the ‘Other’ section on the
              form or on the app.
            </li>
          </ul>
          Please also take a photo if you can.
        </P>
      </Collapse>
    </Section>
  </>
);

Manual.Header = () => <h3 className="manual-title">{survey.label}</h3>;

export default Manual;
