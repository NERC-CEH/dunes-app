import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Page, Header } from '@apps';
import Main from './Main';

export default class index extends Component {
  static propTypes = {
    // sample,
    // subSample,
  };

  render() {
    const { sample, subSample } = this.props;
    const isDisabled = sample.isDisabled();

    return (
      <Page id="survey-fixed-photography-transect-point-edit">
        <Header title="Point" />
        <Main sample={sample} subSample={subSample} isDisabled={isDisabled} />
      </Page>
    );
  }
}
