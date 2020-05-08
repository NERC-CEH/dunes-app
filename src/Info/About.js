import React from 'react';
import { Header, Page, Main, Section } from '@apps';

const { P } = Section;

export default () => (
  <Page id="about">
    <Header title="About" />
    <Main class="ion-padding">
      <Section>
        <P>
          Dynamic Dunescapes is a fantastic new project to restore sand dunes
          across England and Wales for the benefit of people, communities and
          wildlife. Sand dunes in the UK look very different today.
        </P>
        <P>
          Gone are the sandy features, which made homes for special creatures,
          so let’s bring them back, to stay!
        </P>
        <P>
          Picnics in a sheltered hollow, hide and seek... sand dunes are a
          familiar and natural playground. Less well known is their role as a
          sanctuary for endangered plants and animals like the fen orchid and
          sand lizard. But our sand dunes are under threat. They are becoming
          more and more densely covered by grass and scrub while our wildlife
          needs areas of open sand to thrive. Healthy sand dunes need to move
          and be dynamic.
        </P>
        <P>
          The Dynamic Dunescapes project is big and ambitious – targeting some
          of the most important sand dune systems across England and Wales. We
          will work with schools and local groups, volunteers and visitors of
          all ages and abilities to create more bare sand which will breathe
          life into the dunes and allow the threatened wildlife to flourish.
        </P>
      </Section>
    </Main>
  </Page>
);
