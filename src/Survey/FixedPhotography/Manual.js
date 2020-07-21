import React from 'react';
import { Section, Collapse } from '@apps';
// import survey from './config';
const survey = { label: 'Fixed-point Photography' };

const { P, H } = Section;

const Manual = () => (
  <>
    <Section>
      <H>Background</H>
      <P>
        The aim of this survey is to develop a visual record of the sand dune
        system using fixed point photographs. This will allow assessments to be
        made of how the morphology and vegetation composition of sites are
        changing over time.
      </P>
    </Section>

    <Section>
      <H>Method</H>
      <Collapse title="When and where to survey">
        <P>
          Fixed point photographs should be taken at least once a year, in April
          or May, at preselected locations.
        </P>
      </Collapse>

      <Collapse title="Equipment">
        <P>
          Make sure you take with you:
          <ul>
            <li>Handheld GPS unit</li>
            <li>
              (Mobile phone app – fixed point photography locations downloaded
              beforehand)
            </li>
            <li>Compass</li>
            <li>Fixed point photography recording form</li>
            <li>Camera</li>
          </ul>
        </P>
      </Collapse>

      <Collapse title="Navigating to the photography points">
        <P>
          <ul>
            <li>
              Using your handheld GPS (and mobile phone app), navigate to each
              photography point, which will be marked by a post. The grid
              reference can be found on the description form for photography
              points, or described on the app. Some photography points may be
              along transects, others may be in dune slacks or other points of
              interest on the site.
            </li>
            <li>
              For points that are along transects, from the starting point of
              the transect marked by a post, use the grid reference of the end
              of the transect and your compass (and your mobile phone app) to
              navigate along the transect.
            </li>
          </ul>
        </P>
      </Collapse>

      <Collapse title="What to record">
        <P>
          <ul>
            <li>
              Take a photograph at each photography point. The important thing
              here is to take your photograph so it matches the position of the
              original photo (see the list of locations, or the app) so that
              direct comparisons can be made. To help you do this:
              <ul>
                <li>
                  Each photograph should be taken in the direction indicated (as
                  aligned with the guide photo)
                </li>

                <li>Take the photograph at eye level</li>

                <li>
                  Refer back to the photographs shown in the transect
                  description form, or on the app. If there are any useful
                  reference points (e.g. trees, buildings), make sure these are
                  in the same place in your new photograph.
                </li>
              </ul>
            </li>
            <li>
              For each photograph, record the time it was taken on the recording
              form so that it can be identified and stored correctly. This will
              be recorded automatically on the app.
            </li>
          </ul>
        </P>
      </Collapse>
    </Section>
  </>
);

Manual.Header = () => <h3 className="manual-title">{survey.label}</h3>;

export default Manual;
