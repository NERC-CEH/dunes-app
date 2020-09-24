import React from 'react';
import { Section, Collapse } from '@apps';
import { Trans as T } from 'react-i18next';
import { IonImg } from '@ionic/react';
import figure1 from 'common/images/dunesProfileManulFigure.jpg';

const survey = { label: 'Dunes Profile' };

const { P, H } = Section;

const Manual = () => (
  <>
    <Section>
      <H>Background</H>
      <P>
        The aim of this activity is to create a height profile of key areas of
        interest in the sand dune system. These are likely to focus on naturally
        mobile dunes, blow-outs and managed or rejuvenated areas which have
        created bare sand. This can then be used to examine how the height
        profile of the sand dunes is changing over time and how much dynamism
        there is in the system.
      </P>
    </Section>

    <Section>
      <H>Method</H>
      <Collapse title="When and where to survey">
        <P>
          Sand profile surveys are carried out once a year, in April or May,
          along the preselected transect routes. It will take roughly two to
          four hours depending on the length of the transect.
        </P>
      </Collapse>

      <Collapse title="Equipment">
        <P>
          Take with you:
          <ul>
            <li>Handheld GPS unit</li>
            <li>Mobile phone app - transect locations downloaded beforehand</li>
            <li>Compass</li>
            <li>Long tape measure (ideally 50 m or more)</li>
            <li>Ranging poles (exactly the same height)</li>
            <li>Clinometer</li>
          </ul>
        </P>
      </Collapse>

      <Collapse title="Navigating to and along the transect">
        <P>
          <ul>
            <li>
              Using your handheld GPS (and mobile phone app), navigate to the
              first point of the transect, which will be marked by a post. The
              grid reference can be found on the transect description form, or
              the start point described on the app.
            </li>
            <li>
              Use the grid reference for the end of the transect and your
              compass (and your mobile phone app) to navigate along the
              transect. For transects ending at the beach, the end point will be
              on the beach itself.
            </li>
            <li>
              Use the tape measure to measure the distance between survey
              locations.
            </li>
            <li>
              When using the app, use the same phone to record all the data for
              one transect.
            </li>
          </ul>
        </P>
      </Collapse>

      <Collapse title="What to record along the transect">
        <P>
          <ul>
            <li>
              At point 1 of the transect, person A should stand holding ranging
              pole 1 and the clinometer. Make sure you hold the pole vertical
              and it does not sink into the sand. Enter the grid reference of
              the start point on the manual recording form. The app will do this
              automatically when you register the Start point.
            </li>
            <li>
              Following the bearing of the transect (i.e. heading towards the
              end point), person B should take ranging pole 2 to the point at
              which there is a marked change in the angle of the slope of the
              dune, or at approximately 50 m distance if no clear change in
              slope (see Figure 1) - there may be long uniform areas which are
              beyond convenient sighting distance. At this point, place ranging
              pole 2 on the ground, again making sure you hold it vertical and
              that it does not sink into the sand. Enter the grid reference of
              this point on the recording form. The app will automatically
              record the grid reference when you click to register the next
              survey point.
            </li>

            <br />
            <IonImg src={figure1} />
            <figcaption>
              Figure 1. Illustration of how to measure the profile along a sand
              dune
            </figcaption>
            <br />
            <li>
              Person A should then use the clinometer to measure the angle of
              the slope from pole 1 to pole 2. The reading should be taken in
              the direction of the transect, from the top of pole 1 to the top
              of pole 2 (see diagram above). If the poles are too tall to sight
              from the top, then read from the marking on pole 1 that is closest
              to person A’s eye level and the corresponding marking on pole 2
              (mark these with bright coloured tape before starting the transect
              for easy reference). Note down this angle on the recording form,
              or in the app.
            </li>
            <li>
              If you find yourself going downhill as you walk along the
              transect, it should be noted in the recording form or on the app
              that this was a downhill reading. Enter the angle as a negative
              number.
            </li>
            <li>
              Use the tape measure to measure the distance along the ground from
              pole 1 to pole 2. Note this distance down on the recording form,
              or in the app.
            </li>
            <li>
              Person B with pole 2 should then stay where they are and person A
              should continue walking along the bearing of the transect, handing
              the clinometer to person A as they pass them.
            </li>
            <li>
              When they reach another distinct change in the angle of the slope
              of the dune, they should stop and place ranging pole 1 vertically
              on the sand and the process of measuring the angle of the slope
              and the distance between the poles should be repeated, this time
              with person B taking clinometer the measurements from pole 2 to
              pole 1, in the direction of the transect.
            </li>
            <li>
              Repeat this process until you reach the end of the transect.
            </li>
            <li>
              Notes:
              <ul>
                <li>
                  On very loose sand on a steep dune, it may be necessary to
                  walk a few metres away from the direct line to avoid
                  disturbing the dune, but track back to the direct line to take
                  the next measurement.
                </li>
                <li>
                  The end point of the transect for transects leading to the
                  shore should be approximately 5 m seawards from the edge of
                  the mobile dune or embryo dune zone.
                </li>
              </ul>
            </li>
          </ul>
        </P>
      </Collapse>
    </Section>
  </>
);

Manual.Header = () => (
  <h3 className="manual-title">
    <T>{survey.label}</T>
  </h3>
);

export default Manual;
