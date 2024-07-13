import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const CheckIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path fill={fill} d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </Icon>
  );
};

CheckIcon.propTypes = {
  fill: PropTypes.string,
};

CheckIcon.defaultProps = {
  fill: '#C9EEFE',
};

export default CheckIcon;
