import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import LanguageSelect from './components/LanguageSelect';

const LanguageSelectRequired = observer(({ appModel, children }) => {
  if (!appModel.attrs.language) {
    return <LanguageSelect appModel={appModel} />;
  }

  return children;
});

LanguageSelectRequired.propTypes = {
  appModel: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default LanguageSelectRequired;
