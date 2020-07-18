import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Page, Header } from '@apps';
import Main from './Main';

/* eslint-disable react/prefer-stateless-function */
export default class index extends Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    subSample: PropTypes.object.isRequired,
  };

  render() {
    const { sample, subSample } = this.props;
    const isDisabled = sample.isDisabled();
    const { type } = subSample.metadata;

    return (
      <Page id="survey-dunes-profile-transect-point-edit">
        <Header title={type} />
        <Main {...this.props} isDisabled={isDisabled} />
      </Page>
    );
  }
}
