import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import InputList from '@bit/flumens.apps.input-list';
import Input from '@bit/flumens.apps.input';
import RadioInput from '@bit/flumens.apps.radio-input';
import Textarea from '@bit/flumens.apps.textarea';
import SliderInput from '@bit/flumens.apps.slider-input';

class Component extends React.Component {
  state = { currentVal: this.props.initialVal };

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  onValueChanged = (val, radioWasClicked) => {
    if (this._ismounted) {
      this.setState({ currentVal: val });
    }
    this.props.onValueChange(val, radioWasClicked);
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.controlled &&
      prevProps.initialVal !== this.props.initialVal
    ) {
      // eslint-disable-next-line
      this.setState({ currentVal: this.props.initialVal });
    }
  }

  render() {
    const { attrConfig } = this.props;

    switch (attrConfig.type) {
      case 'date':
      case 'input':
        return (
          <Input
            type={attrConfig.type}
            config={attrConfig}
            default={this.state.currentVal}
            onChange={this.onValueChanged}
          />
        );
      case 'inputList':
        return (
          <InputList
            type="text"
            config={attrConfig}
            default={this.state.currentVal}
            onChange={this.onValueChanged}
          />
        );

      case 'radio': {
        return (
          <RadioInput
            values={attrConfig.values}
            onChange={val => this.onValueChanged(val, true)}
            currentValue={this.state.currentVal}
            info={attrConfig.info}
          />
        );
      }
      case 'textarea':
        return (
          <Textarea
            config={attrConfig}
            default={this.state.currentVal}
            onChange={this.onValueChanged}
          />
        );

      case 'slider':
        return (
          <SliderInput
            config={attrConfig}
            default={this.state.currentVal}
            onChange={this.onValueChanged}
          />
        );

      default:
        throw new Error('Samples:AttrView: no such attribute type was found!');
    }
  }
}

Component.propTypes = {
  attrConfig: PropTypes.object.isRequired,
  onValueChange: PropTypes.func.isRequired,
  initialVal: PropTypes.any,
  controlled: PropTypes.bool,
};

export default observer(Component);
