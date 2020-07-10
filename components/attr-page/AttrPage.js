import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonPage, NavContext } from '@ionic/react';
import Main from '@bit/flumens.apps.main';
import Header from '@bit/flumens.apps.header';
import Attr from '@bit/flumens.apps.attr';
import ComplexAttr from '@bit/flumens.apps.complex-attr';

function getRenderConfig(model, configId) {
  let survey = model.getSurvey();
  let config;
  if (survey.render) {
    let { render } = survey;
    render = typeof render === 'function' ? render(model) : render;
    config = render.find(e => e === configId || e.id === configId);
  }

  const searchParent = !config && model.parent;
  if (searchParent) {
    survey = model.parent.getSurvey();
    let { render } = survey;
    render = typeof render === 'function' ? render(model) : render;
    config = render.find(e => e === configId || e.id === configId);
  }

  return config;
}

class Controller extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    sample: PropTypes.object.isRequired,
    subSample: PropTypes.object, // optional
    occurrence: PropTypes.object, // optional
    match: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const { sample, subSample, occurrence, match } = props;

    const model = occurrence || subSample || sample;

    this.attrType = occurrence ? 'occ' : 'smp';
    this.attrName = match.params.attr;

    this.state = { model };

    this.survey = model.getSurvey();

    const id = `${this.attrType}:${this.attrName}`;
    const renderConfig = getRenderConfig(model, id);
    if (renderConfig && typeof renderConfig !== 'string') {
      this.complexAttr = true;
      this.attrConfig = renderConfig;

      this.attrConfig.groupConfig = [];
      this.initialVal = [];

      this.attrConfig.group.forEach(fullAttrName => {
        const [, attrName] = fullAttrName.split(':');
        this.attrConfig.groupConfig.push(this.survey.attrs[attrName]);
        this.initialVal[attrName] = this.state.model.attrs[attrName];
      });
    } else {
      this.attrConfig = this.survey.attrs[this.attrName];
      if (this.attrConfig.get) {
        this.initialVal = this.attrConfig.get(this.props);
      } else {
        this.initialVal = this.state.model.attrs[this.attrName];
      }
    }

    this.latestVal = this.initialVal;
  }

  save = async () => {
    const { model } = this.state;
    const values = this.latestVal;

    if (this.complexAttr) {
      this.saveComplex(model, values);
      return;
    }

    // validate before setting up
    if (this.attrConfig.isValid) {
      const isValid = this.attrConfig.isValid(values);
      if (!isValid) {
        // TODO: do some prop callback function
        return;
      }
    }

    if (this.attrConfig.set) {
      this.attrConfig.set(values, this.props);
    } else {
      model.attrs[this.attrName] = values;
    }

    await model.save();
  };

  saveComplex = async (model, values) => {
    Object.entries(values).forEach(([key, value]) => {
      // todo: validate before setting up
      if (!value) {
        delete model.attrs[key];
        return;
      }
      model.attrs[key] = value;
    });

    await model.save();
  };

  onExit = () => this.save().then(this.context.goBack);

  onValueChange = (newValue, exit) => {
    this.latestVal = newValue; // cache the val if left using the header
    if (exit) {
      this.onExit();
    }
  };

  getAttr = () => {
    if (this.complexAttr) {
      return (
        <ComplexAttr
          attrConfig={this.attrConfig}
          onValueChange={this.onValueChange}
          initialVal={this.initialVal}
        />
      );
    }

    return (
      <Attr
        attrConfig={this.attrConfig}
        onValueChange={this.onValueChange}
        initialVal={this.initialVal}
      />
    );
  };

  render() {
    const headerTitle = this.attrConfig.label || this.attrName;

    return (
      <IonPage>
        <Header title={headerTitle} onLeave={this.onExit} />
        <Main>{this.getAttr()}</Main>
      </IonPage>
    );
  }
}

export default observer(Controller);
