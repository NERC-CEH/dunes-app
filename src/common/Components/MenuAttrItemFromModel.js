import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { MenuAttrItem } from '@apps';

const MenuAttrItemFromModel = ({ attr, model, match }) => {
  const survey = model.getSurvey();
  const value = model.attrs[attr];
  const isDisabled = model.isDisabled();

  return (
    <MenuAttrItem
      routerLink={`${match.url}/${attr}`}
      disabled={isDisabled}
      value={value}
      {...survey.attrs[attr]}
    />
  );
};

MenuAttrItemFromModel.propTypes = {
  attr: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(MenuAttrItemFromModel);
