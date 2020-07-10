import React from 'react';
import PropTypes from 'prop-types';
import { Trans as T } from 'react-i18next';
import { IonItem, IonRange, IonButton, IonIcon } from '@ionic/react';
import { removeCircleOutline, addCircleOutline } from 'ionicons/icons';
import './styles.scss';

const DEFAULT_STEP = 1;

// http://stackoverflow.com/questions/846221/logarithmic-slider
function LogSlider(options = {}) {
  this.minpos = options.minpos || 0;
  this.maxpos = options.maxpos || 100;

  if (options.notUseLogarithmic) {
    this.notUseLogarithmic = true;
    return;
  }
  this.minlval = Math.log(options.minval || 1);
  this.maxlval = Math.log(options.maxval || 100000);

  this.scale = (this.maxlval - this.minlval) / (this.maxpos - this.minpos);
}

LogSlider.prototype = {
  // Calculate value from a slider position

  value(position) {
    if (this.notUseLogarithmic) {
      return position;
    }
    return Math.floor(
      Math.exp((position - this.minpos) * this.scale + this.minlval)
    );
  },
  // Calculate slider position from a value
  position(value) {
    if (this.notUseLogarithmic) {
      return value;
    }

    return Math.floor(
      this.minpos + (Math.log(value) - this.minlval) / this.scale
    );
  },
};

class Component extends React.Component {
  static propTypes = {
    default: PropTypes.number,
    config: PropTypes.any.isRequired,
    info: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  sliderRef = React.createRef();

  inputRef = React.createRef();

  logsl = new LogSlider({
    maxpos: 500,
    minval: this.props.config.min || 1,
    maxval: this.props.config.max || 500,
    notUseLogarithmic: this.props.config.max <= 500,
  });

  state = {
    value: this.props.default,
    position: this.logsl.position(this.props.default || 1).toFixed(0),
  };

  onChangeInputE = e => {
    const { value } = e.target;

    if (value > this.props.config.max || value < this.props.config.min) {
      return;
    }

    this.onChangeInput(value);
  };

  onChangeInput = val => {
    let value = parseFloat(val);
    let position = null;
    if (!Number.isNaN(value)) {
      position =
        value <= this.props.config.max || value >= this.props.config.min
          ? this.logsl.position(value)
          : null;
    } else {
      value = null;
    }

    if (this.state.sliderUpdating) {
      this.setState({ value, sliderUpdating: false });
    } else {
      this.setState({ position, value, inputUpdating: true });
      this.props.onChange(value);
    }
  };

  onChangeSlider = e => {
    let position = parseFloat(e.target.value);

    if (Number.isNaN(position)) {
      position = null;
    }

    const value =
      position <= this.props.config.max || position >= this.props.config.min
        ? this.logsl.value(position)
        : null;

    if (this.state.inputUpdating) {
      this.setState({ position, inputUpdating: false });
    } else {
      this.setState({ position, value, sliderUpdating: true });
      this.props.onChange(value);
    }
  };

  componentDidMount() {
    this.sliderRef.current.addEventListener('ionChange', this.onChangeSlider);
    this.inputRef.current.addEventListener('ionChange', this.onChangeInputE);
  }

  componentWillUnmount() {
    this.sliderRef.current.removeEventListener(
      'ionChange',
      this.onChangeSlider
    );
    this.inputRef.current.removeEventListener('ionChange', this.onChangeInputE);
  }

  increaseCount = () => {
    const val = this.state.value || 0;
    const { step = DEFAULT_STEP } = this.props.config;

    const newVal = val + step;

    if (newVal > this.props.config.max) {
      return;
    }

    this.onChangeInput(newVal);
  };

  decreaseCount = () => {
    const val = this.state.value || 0;
    const { step = DEFAULT_STEP } = this.props.config;

    if (val < this.props.config.min + step) {
      return;
    }
    this.onChangeInput(val - step);
  };

  render() {
    const config = this.props.config || {};
    const message = this.props.info || config.info;
    const validMax = !Number.isNaN(this.props.config.max)
      ? this.props.config.max
      : 100;

    return (
      <div>
        {message && (
          <div className="info-message">
            <p>
              <T>{message}</T>
            </p>
          </div>
        )}
        <IonItem className="slider-input">
          <IonRange
            ref={this.sliderRef}
            min={this.props.config.min || 0}
            max={validMax}
            step={this.props.config.step || DEFAULT_STEP}
            onChange={this.onChangeSlider}
            value={this.state.position}
          />
          <IonButton
            shape="round"
            fill="clear"
            size="default"
            className="decrement-button"
            onClick={this.decreaseCount}
          >
            <IonIcon icon={removeCircleOutline} />
          </IonButton>
          <input
            ref={this.inputRef}
            type="number"
            onChange={this.onChangeInputE}
            value={this.state.value || 0}
          />
          <IonButton
            shape="round"
            fill="clear"
            size="default"
            className="increment-button"
            onClick={this.increaseCount}
          >
            <IonIcon icon={addCircleOutline} />
          </IonButton>
        </IonItem>
      </div>
    );
  }
}

export default Component;
