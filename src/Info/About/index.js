import React from 'react';
import appModel from 'appModel';
import { Header, Page, Main, Section } from '@apps';
import { IonList, IonImg, IonRow, IonGrid, IonCol } from '@ionic/react';
import data from './data';
import './styles.scss';

const { P } = Section;

const About = () => {
  const { language } = appModel.attrs;

  const showSponsors = obj => {
    return (
      <IonCol key={obj.id} size={obj.size}>
        <a href={obj.url}>
          <IonImg src={obj.images} style={{ width: obj.width }} alt={obj.alt} />
        </a>
      </IonCol>
    );
  };

  const getSponsorsGrid = () => {
    const sponsorsColumns = data
      .filter(obj => (obj.language ? obj.language === language : true))
      .map(showSponsors);

    return (
      <IonList>
        <IonGrid className="sponsors-list">
          <IonRow>{sponsorsColumns}</IonRow>
        </IonGrid>
      </IonList>
    );
  };

  return (
    <Page id="about">
      <Header title="About" />
      <Main class="ion-padding">
        <Section>
          <P>
            By identifying and recording plant species, you can help scientists
            and conservationists protect and restore biodiverse sand dune
            habitats in England and Wales, using this app. With a beautiful
            range of habitats, coastal sand dunes are home to some amazing
            wildlife – including butterflies, lizards, toads and orchids. As a
            citizen scientist, you’ll help researchers gather vital sand dune
            habitat and species data to help strengthen the understanding of
            what’s going on in coastal sand dune environments, and to help
            improve the conservation work that is being done.
          </P>
          <P>
            From monitoring species to taking part in transect or quadrat
            surveys, explore the range of citizen science activities in the app
            which you can get involved in, and share your findings in the app
            when you next visit your chosen sand dune site.
          </P>
          <P>
            Dynamic Dunescapes is a partnership project supported by the
            National Lottery Heritage Fund and the EU LIFE Programme. Project
            partners are Natural England, Plantlife, Natural Resources Wales,
            National Trust and the Wildlife Trusts.
          </P>
        </Section>

        {getSponsorsGrid(data)}
      </Main>
    </Page>
  );
};

export default About;
