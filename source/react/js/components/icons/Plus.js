import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const PlusIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 13 13" {...props}>
      <path fill={fill} fillRule="evenodd" d="M5.181 12.804V7.65H0V5.1h5.181V0h2.442v5.1h5.181v2.55H7.623v5.154z" />
    </Icon>
  );
};

PlusIcon.propTypes = {
  fill: PropTypes.string,
};

PlusIcon.defaultProps = {
  fill: '#1E78BE',
};

export default PlusIcon;
