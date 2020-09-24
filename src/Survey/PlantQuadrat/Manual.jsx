import React from 'react';
import { Section, Collapse } from '@apps';
import { Trans as T } from 'react-i18next';

const survey = { label: 'Plant Quadrat Recording' };

const { P, H } = Section;

const Manual = () => (
  <>
    <Section>
      <H>Background</H>
      <P>
        The aims of this survey cover three aspects:
        <ul>
          <li>
            to record the percentage cover of bare sand and the cover and height
            of broad vegetation types. This will allow us to examine whether the
            composition and structure of the vegetation at the site is changing
            over time.
          </li>
          <li>
            to record the percentage cover of plant species that are positive
            and negative indicators of dune health (including rare species and
            invasive species) so we can track how the health of the sand dune
            system is changing over time.
          </li>
          <li>
            to record the percentage cover of species which indicate higher
            nutrient levels.
          </li>
        </ul>
      </P>
    </Section>

    <Section>
      <H>Method</H>
      <Collapse title="When and where to survey">
        <P>
          Vegetation surveys should take place once a year, in June, July or
          August, at pre-set quadrat locations. It will take roughly 30-45
          minutes to complete a survey in a single quadrat.
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
            <li>Long tape measure (more than 10 metre)</li>
            <li>Ruler (1 metre, or short tape measure</li>
            <li>4 marking canes</li>
          </ul>
        </P>
      </Collapse>

      <Collapse title="Finding and marking out the quadrat">
        <P>
          <ul>
            <li>
              Using your handheld GPS (and mobile phone app), navigate to the
              grid reference of the quadrat you intend to survey. This will be
              marked by a post in all habitats except for mobile dunes. The grid
              reference and the habitat it is located in can be found on the
              description form for quadrats, or described on the app.
            </li>
            <li>
              Where the quadrat has a marker post, use your tape measure and
              compass to measure 2 m due north and then place one of your
              marking canes in the ground at this point; this will be the south
              west corner of the quadrat.
            </li>
            <li>
              If it is a mobile dune quadrat, place one of your marking canes at
              the point of the grid reference you were provided with; this will
              be south west corner of the quadrat.
            </li>
            <li>
              Then, using your compass, find due north and, using the tape
              measure, measure 2 m in this direction. Mark this point using a
              second marking cane.
            </li>
            <li>
              Repeat this process moving east, south then west until you have
              marked out a 2 m by 2 m square.
            </li>
            <li>
              You can keep the tape measure wrapped around the outside of the
              canes to help you define what is inside and what is outside of the
              quadrat.
            </li>
          </ul>
          Notes:
          <ul>
            <li>
              The marker post is positioned 2 m away from the quadrat itself to
              avoid disturbance in the quadrat e.g. from livestock using it as a
              scratching post or birds perching on it.
            </li>
          </ul>
        </P>
      </Collapse>

      <Collapse title="What to record in the quadrat">
        <ul>
          <Collapse title="Vegetation cover">
            <P>
              Note the total percentage cover within the quadrat of:
              <ul>
                <li>Bare ground/sand</li>
                <li>Mosses and lichens (see species guide).</li>
                <li>
                  Grasses, sedges and rushes. These are all plants that are
                  grass-like in appearance. The stems of sedges generally have
                  three edges whereas rushes have very rounded stems that are
                  filled with pith.
                </li>
                <li>
                  Herbs. These are all other plants which are not trees or
                  shrubs (but includes things like bramble, bracken and other
                  ferns).
                </li>
                <li>Heathland shrubs (heather, gorse, bilberry)</li>
                <li>Trees and scrub (including young plants)</li>
              </ul>
              Estimates should be made by looking from above at the vegetation
              cover. It may help to try to imagine all of the different patches
              of a single vegetation type clustered together and how much of the
              2 × 2 m square this would take up. Keep in mind that:
              <ul>
                <li>20 × 20 cm is 1 % cover</li>
                <li>50 × 50 cm is 6.25 % cover</li>
                <li>1 × 1 m is 25 % cover</li>
              </ul>
              Looking at the tape measure surrounding the quadrat may help here.
              <br />
              If there are multiple people in your surveying team, each person
              should come up with an estimated percentage cover for each
              vegetation type separately and then the average of these estimates
              should be recorded on the quadrat recording form.
              <br />
              If the cover of a single vegetation type is less than 1 % then
              record this as 0.5 %
              <br />
              The total vegetation cover may exceed 100 % because different
              layers of vegetation may be overlapping but combined cover of
              vegetation and bare ground/sand should reach at least 100 %
              otherwise an error has been made. The app will automatically
              calculate the total cover.
            </P>
          </Collapse>
          <Collapse title="Vegetation height">
            <P>
              Considering all areas with vegetation in the quadrat, take five
              measurements of the height of the vegetation (ideally one in each
              quarter of the quadrat and one in the middle). Measure the height
              with a ruler or tape measure, recording the height that most of
              the vegetation reaches within roughly 20 cm of your ruler – ignore
              occasional tall flowering stems if they rise above this height. If
              there are multiple people in your surveying team, it is useful for
              two or three to agree the height that should be recorded in each
              location. Record all five height measurements on your form, or on
              the app. The app will automatically calculate the average.
            </P>
          </Collapse>
          <Collapse title="Health indicator species and nitrogen indicator species">
            <P>
              Using the species list of positive and negative plant indicators
              for the site, for each species that you see in the quadrat, record
              its name on the quadrat recording form, or select it in the app.
              Note that there are separate lists for each habitat so make sure
              you use the appropriate one for the quadrat you are surveying.
              Estimate the percentage cover of each species.
              <br />
              Repeat this process for the nitrogen indicator species (for fixed
              dune grassland and dune slack habitats) Estimates should be made
              by looking from above at the vegetation cover. It may help to
              imagine all of the different patches of a single vegetation type
              clustered together and how much of the 2 × 2 m square this would
              take up. Keep in mind that:
              <ul>
                <li>20 × 20 cm is 1 % cover</li>
                <li>50 × 50 cm is 6.25 % cover</li>
                <li>1 × 1 m is 25 % cover</li>
              </ul>
              <br />
              Looking at the tape measure surrounding the quadrat may help here.
              <br />
              If there are multiple people in your surveying team, each person
              should come up with an estimated percentage cover for each
              vegetation type separately and then the average of these estimates
              should be recorded on the quadrat recording form, or in the app.
              <br />
              If the cover of a single vegetation type is less than 1 % then
              record this as 0.5 % on the quadrat recording form.
            </P>
          </Collapse>
        </ul>
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
