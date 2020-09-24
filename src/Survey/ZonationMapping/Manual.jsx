import React from 'react';
import { Section, Collapse } from '@apps';
import { Trans as T } from 'react-i18next';
import figure1 from 'common/images/zonationMappingManualFigure.jpg';

const survey = { label: 'Zonation Mapping' };

const { P, H } = Section;

const Manual = () => (
  <>
    <Section>
      <H>Background</H>
      <P>
        The aim of this activity is to record and photograph the locations of
        transitions between different zones of the sand dune system to monitor
        how these boundaries are changing over time. Transitions are the abrupt
        or gradual change of habitat from one type to another. Monitoring is
        likely to focus on some of the following: mobile dune transitions to
        semi-fixed or to fixed dunes, the extent of bare sand around newly
        restored/scraped areas or blowouts, scrub encroachment or the transition
        from dune slack vegetation to drier habitats.
      </P>
    </Section>

    <Section>
      <H>Method</H>
      <Collapse title="When and where to survey">
        <P>
          Zonation surveys are carried out once a year, in April or May, along
          the fixed transect routes that have been selected at your site. It
          will take roughly take between 1 to 3 hours per transect.
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
            <li>
              Marker canes with high visibility tape/ribbon (suggested minimum
              3)
            </li>
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
              transect. The 3 marker canes can help you keep to the transect.
              Place the first marker cane at the start point. Following the
              bearing provided for the transect, navigate along the transect
              roughly 50 metres & place the second marker cane. A person sited
              at the first marker cane, holding the compass can then direct the
              location of the third marker cane to be placed 50m further down
              the transect. When all 3 canes are aligned, walk back to the first
              cane and start recording the transitions. The first cane, can then
              be re-located further along, aligning with the other two canes to
              maintain your bearing and the process repeated to move down the
              transect. Some transects may be shorter than 100m. Adjust the
              method if required to maintain line of sight between marker canes.
              For transects ending at the beach, the last point will be on the
              beach itself.
            </li>
            <li>
              Use the tape measure to measure the distance between locations,
              and record the distance between zonation transition points.
            </li>
          </ul>
        </P>
      </Collapse>

      <Collapse title="What to record along the transect">
        <P>
          <ul>
            <li>
              As you walk along the transect, use the sand dune zone guide to
              assess which zone you are in (Figure 1). When you move from one
              zone to another, record the grid reference from your GPS (if using
              the manual recording form), along with the names of the zones you
              are moving between. The app will guide you through this when you
              enter a new transition point.
            </li>

            <br />
            <img src={figure1} />
            <figcaption>
              Figure 1. Diagram of zones in a sand dune system.
            </figcaption>
            <br />

            <li>
              Record the distance from the last transition point, in metres and
              to the nearest 10 cm.
            </li>
            <li>
              At each transition point, take two photographs perpendicular to
              the direction of the transect (one to the left, and one to the
              right). On the manual recording form, note down the time that
              these photographs were taken so that they can be identified and
              stored correctly. On the app, the time of photos will be recorded
              automatically.
            </li>
            <li>
              Notes:
              <ul>
                <li>
                  The transition between different zones may not be clear cut
                  but you should record the point at which you feel the
                  dominance of characteristics has shifted from one zone type to
                  another.
                </li>
                <li>
                  You may also transition from one zone to another and then back
                  again – each transition should be recorded on the form.
                  Anything larger than 2 metres can be considered a new zone.
                </li>
                <li>
                  On very loose sand on a steep dune, it may be necessary to
                  walk a few metres away from the direct line to avoid
                  disturbing the dune, but track back to the direct line to take
                  the next measurement.
                </li>

                <li>
                  The end point for some transects may be a scrub or woodland
                  boundary – in this case, measure to where the scrub/woodland
                  forms a fairly unbroken line (not individual bushes or trees).
                </li>

                <li>
                  The end point of the transect for transects leading onto the
                  shore should be approximately 5 m seawards from the last
                  vegetation you see (but be aware of steep eroded dune edges –
                  if access is difficult just record this edge).
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
