import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { NavContext } from '@ionic/react';
import { Page, Header } from '@apps';
import Sample from 'sample';
import Main from './Main';

@observer
class Controller extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    sample: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  addLocationPoint = type => {
    const { sample, location } = this.props;
    const survey = sample.getSurvey();

    const pointSample = survey.smp.create(Sample, type);
    sample.samples.push(pointSample);
    pointSample.startGPS();
    sample.save();

    this.context.navigate(`${location.pathname}/${pointSample.cid}`);
  };

  render() {
    const { sample } = this.props;
    const isDisabled = sample.isDisabled();

    return (
      <Page id="survey-dunes-profile-transect-edit">
        <Header title="Location" />
        <Main
          {...this.props}
          addLocationPoint={this.addLocationPoint}
          isDisabled={isDisabled}
        />
      </Page>
    );
  }
}

export default Controller;
