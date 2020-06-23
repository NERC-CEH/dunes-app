import React from 'react';
import { observer } from 'mobx-react';
import { Page, Header } from '@apps';
import Main from './Main';

const Controller = observer(props => {
  const { match } = props;

  const title = match.params.indicatorType === 'health' ? 'Health' : 'Nitrogen';

  return (
    <Page id="survey-plant-quadrat-indicator-edit">
      <Header title={title} />
      <Main {...props} />
    </Page>
  );
});

export default Controller;
