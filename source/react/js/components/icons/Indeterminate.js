import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const IndeterminateIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 9 2" {...props}>
      <path fill="none" stroke={fill} d="M23,38 L32,38" transform="translate(-23 -37)" />
    </Icon>
  );
};

IndeterminateIcon.propTypes = {
  fill: PropTypes.string,
};

IndeterminateIcon.defaultProps = {
  fill: '#C9EEFE',
};

export default IndeterminateIcon;
