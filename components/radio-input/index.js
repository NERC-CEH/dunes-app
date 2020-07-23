import React from 'react';
import PropTypes from 'prop-types';
import {
  IonItem,
  IonLabel,
  IonList,
  IonRadioGroup,
  IonRadio,
  IonItemDivider,
} from '@ionic/react';
import { withTranslation, Trans as T } from 'react-i18next';
import './styles.scss';

class Component extends React.PureComponent {
  onChange = e => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  getMessage() {
    const { info } = this.props;

    if (!info) {
      return null;
    }

    return (
      <div className="info-message">
        <p>
          <T>{info}</T>
        </p>
      </div>
    );
  }

  render() {
    const { values, currentValue, skipTranslation, t } = this.props;

    const getInput = ({ label, value, isDefault, isPlaceholder, id }) => {
      if (isPlaceholder) {
        return (
          <IonItemDivider key={label}>
            <IonLabel>{label}</IonLabel>
          </IonItemDivider>
        );
      }

      const className = isDefault ? 'radio-input-default-option' : '';
      let radioLabel = label || `${value}`; // wrap value in string to skip i18n interpolation

      if (!skipTranslation) {
        radioLabel = t(radioLabel);
      }

      return (
        <IonItem key={`${radioLabel} + ${id}`} className={className}>
          <IonLabel class="ion-text-wrap normal-font-size">
            {radioLabel}
          </IonLabel>
          <IonRadio value={value} onClick={this.onChange} />
        </IonItem>
      );
    };

    const inputs = values.map(getInput);

    return (
      <div>
        {this.getMessage()}

        <IonList lines="full">
          <IonRadioGroup value={currentValue}>{inputs}</IonRadioGroup>
        </IonList>
      </div>
    );
  }
}

Component.propTypes = {
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  currentValue: PropTypes.any,
  info: PropTypes.string,
  skipTranslation: PropTypes.bool,
  t: PropTypes.func,
};

export default withTranslation()(Component);
