import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { Header, Page, Main, Section } from '@apps';
import { Trans as T } from 'react-i18next';
import habitats from 'Home/Habitats/data';
import './styles.scss';
import './flumens.png';

const { P, H } = Section;

export default () => (
  <Page id="credits">
    <Header title="Credits" />
    <Main class="ion-padding">
      <Section>
        <H>People</H>
        <P>
          We are very grateful for all the people that helped to create this
          app:
        </P>
        <P skipTranslation>
          <b>Laurence Jones</b> (UK Centre for Ecology & Hydrology)
        </P>
        <P skipTranslation>
          <b>Tim Braund</b> (Plantlife)
        </P>
        <P skipTranslation>
          <b>David Roy</b> (UK Centre for Ecology & Hydrology)
        </P>
        <P skipTranslation>
          <b>Karolis Kazlauskis</b> (Flumens)
        </P>
        <P skipTranslation>
          <b>John van Breda</b> (Biodiverse IT)
        </P>
        <P skipTranslation>
          <b>Biren Rathod</b> (the UK Centre for Ecology & Hydrology)
        </P>
      </Section>

      <Section>
        <H>App Development</H>
        <P>
          This app was hand crafted with love by{' '}
          <a href="https://flumens.io" style={{ whiteSpace: 'nowrap' }}>
            Flumens.
          </a>{' '}
          A technical consultancy that excels at building bespoke environmental
          science and community focussed solutions. For suggestions and feedback
          please do not hesitate to{' '}
          <a href="mailto:enquiries%40flumens.io?subject=Dune%20Defender%20App">
            contact us
          </a>
          .
        </P>
        <p className="flumens-logo">
          <a href="https://flumens.io">
            <img src="/images/flumens.png" alt="" />
          </a>
        </p>
      </Section>

      <Section>
        <H>Graphics</H>
        <P>
          Icons made by{' '}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{' '}
          and{' '}
          <a
            href="https://www.flaticon.com/authors/kiranshastry"
            title="Kiranshastry"
          >
            Kiranshastry
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </P>
      </Section>
      <Section>
        <H>Photos</H>

        <IonItem lines="none">
          <IonLabel class="ion-text-wrap">
            <i>
              <T>Home page:</T>{' '}
            </i>
            <span>Marten Bjork on Unsplash</span>
          </IonLabel>
        </IonItem>

        <IonItem lines="none">
          <IonLabel class="ion-text-wrap">
            <b>
              <small>
                <T>Habitats:</T>
              </small>
            </b>
          </IonLabel>
        </IonItem>
        {habitats
          .filter(s => s.image_copyright)
          .map(s => (
            <IonItem key={s.title} lines="none">
              <IonLabel class="ion-text-wrap">
                <i>{`${s.title}: `}</i>
                <span>{s.image_copyright}</span>
              </IonLabel>
            </IonItem>
          ))}
      </Section>
    </Main>
  </Page>
);
