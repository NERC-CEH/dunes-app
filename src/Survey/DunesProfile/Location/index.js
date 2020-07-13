import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Page, Header } from '@apps';
import Sample from 'sample';
import Main from './Main';

@observer
class Controller extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
  };

  addLocationPoint = type => {
    const { sample } = this.props;
    const survey = sample.getSurvey();

    const pointSample = survey.smp.create(Sample, type);

    sample.samples.push(pointSample);
    sample.save();

    pointSample.startGPS();
  };

  render() {
    return (
      <Page id="survey-dunes-profile-transect-edit">
        <Header title="Location" />
        <Main {...this.props} addLocationPoint={this.addLocationPoint} />
      </Page>
    );
  }
}

export default Controller;
