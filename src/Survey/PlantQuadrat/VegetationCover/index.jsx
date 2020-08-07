import React from 'react';
import { observer } from 'mobx-react';
import { Page, Header } from '@apps';
import Main from './Main';

const Controller = observer(props => (
  <Page id="survey-plant-quadrat-vegetation-cover-edit">
    <Header title="Vegetation Cover" />
    <Main {...props} />
  </Page>
));

export default Controller;
