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
    const label = subSample.getPrettyName();

    return (
      <Page id="survey-zonation-mapping-transect-point-edit">
        <Header title={label} skipTranslation />
        <Main {...this.props} isDisabled={isDisabled} />
      </Page>
    );
  }
}
