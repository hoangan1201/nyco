import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const MinusIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 13 3" {...props}>
      <path fill={fill} fillRule="evenodd" d="M5.181 2.65H0V.1h12.804v2.55H7.623z" />
    </Icon>
  );
};

MinusIcon.propTypes = {
  fill: PropTypes.string,
};

MinusIcon.defaultProps = {
  fill: '#1E78BE',
};

export default MinusIcon;
