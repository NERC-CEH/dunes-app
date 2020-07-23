import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonButton, IonItem } from '@ionic/react';
import { Trans as T, withTranslation } from 'react-i18next';
import { removeCircleOutline, addCircleOutline } from 'ionicons/icons';
import './styles.scss';

class InputList extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    config: PropTypes.object,
    default: PropTypes.array,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    let values = props.default || [];
    if (typeof props.default === 'string') {
      values = [props.default];
    }

    this.state = { values, newValue: '' };

    this.inputRef = React.createRef();
  }

  remove = index => {
    const values = [...this.state.values]; // eslint-disable-line
    values.splice(index - 1, 1); // -1 because of default
    this.setState({ values });

    if (!values.length) {
      this.props.onChange(null);
      return;
    }
    this.props.onChange(values);
  };

  add = () => {
    if (!this.state.newValue) {
      return;
    }

    const values = [this.state.newValue, ...this.state.values]; // eslint-disable-line
    this.setState({
      values,
      newValue: '',
    });

    this.props.onChange(values);
  };

  onChange = (index, { target }) => {
    if (index === 0) {
      this.setState({ newValue: target.value });

      return;
    }
    console.log('xx', this.state.newValue);

    if (!target.value) {
      return;
    }

    const values = [this.state.newValue, ...this.state.values]; // eslint-disable-line

    this.setState({
      values,
      newValue: '',
    });

    this.props.onChange(values);
  };

  getInputComponent = (value, index) => {
    const { config = {}, t } = this.props;
    const { placeholder } = config;

    let button;
    if (index === 0) {
      button = (
        <IonButton fill="clear" slot="end" onClick={this.add}>
          <IonIcon slot="icon-only" icon={addCircleOutline} />
        </IonButton>
      );
    } else {
      button = (
        <IonButton
          key={index}
          fill="clear"
          slot="end"
          color="danger"
          onClick={() => this.remove(index)}
        >
          <IonIcon slot="icon-only" icon={removeCircleOutline} />
        </IonButton>
      );
    }

    return (
      <IonItem key={index} className="input-list-item">
        <input
          type="text"
          className="plain-input"
          placeholder={t(placeholder)}
          value={value}
          onChange={e => this.onChange(index, e)}
        />
        {button}
      </IonItem>
    );
  };

  render() {
    const { config = {} } = this.props;
    const message = config.info;

    const inputs = [this.state.newValue, ...this.state.values].map(
      this.getInputComponent
    );

    return (
      <div>
        {message && (
          <div className="info-message">
            <p>
              <T>{message}</T>
            </p>
          </div>
        )}
        {inputs}
      </div>
    );
  }
}

export default withTranslation()(InputList);
