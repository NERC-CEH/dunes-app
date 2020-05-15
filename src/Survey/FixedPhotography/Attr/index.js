import React from 'react';
import PropTypes from 'prop-types';
import { NavContext } from '@ionic/react';
import {
  Page,
  Main,
  Header,
  Input,
  // SliderInput,
  // RadioInput,
  Textarea,
} from '@apps';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import config from 'common/config/surveys/photography';
import InputList from './components/InputList';

@observer
class Component extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    sample: PropTypes.object.isRequired,
    match: PropTypes.object,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { match, sample } = props;

    this.attrName = match.params.attr;

    const value = sample.attrs[this.attrName];
    this.state = { currentVal: value };

    this.attrConfig = config.attrs[this.attrName];
  }

  onChange = val => {
    const { sample } = this.props;
    this.setState({ currentVal: val });
    sample.attrs[this.attrName] = val;
    sample.save();

    if (this.attrConfig.type === 'radio') {
      this.context.goBack();
    }
  };

  getAttr = () => {
    switch (this.attrConfig.type) {
      case 'number':
      case 'text':
      case 'time':
      case 'date':
        return (
          <Input
            type={this.attrConfig.type}
            config={this.attrConfig}
            default={this.state.currentVal}
            onChange={val => this.onChange(val)}
          />
        );

        // case 'slider':
        //   return (
        //     <SliderInput
        //       type={this.attrConfig.type}
        //       config={this.attrConfig}
        //       default={this.state.currentVal}
        //       onChange={val => this.onChange(val)}
        //     />
        //   );

      case 'textarea':
        return (
          <Textarea
            config={this.attrConfig}
            default={this.state.currentVal}
            onChange={val => this.onChange(val)}
          />
        );

      case 'inputList':
        return (
          <InputList
            type="text"
            config={this.attrConfig}
            default={this.state.currentVal}
            onChange={val => this.onChange(val)}
          />
        );

        // case 'radio':
        //   return (
        //     <RadioInput
        //       config={this.attrConfig}
        //       default={this.state.currentVal}
        //       onChange={val => this.onChange(val)}
        //     />
        //   );

      default:
        // TODO: show 404
        return null;
    }
  };

  render() {
    const { t } = this.props;

    return (
      <Page id="transect-edit-attr">
        <Header title={t(this.attrConfig.label)} />
        <Main>{this.getAttr()}</Main>
      </Page>
    );
  }
}
export default withTranslation()(Component);
