import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const ArrowDownIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 49 57" {...props}>
      <g stroke={fill} strokeWidth="5" fill="none" fillRule="evenodd">
        <path d="M2 31l22.5 22L47 31M24 52V0" />
      </g>
    </Icon>
  );
};

ArrowDownIcon.propTypes = {
  fill: PropTypes.string,
};

ArrowDownIcon.defaultProps = {
  fill: '#3194E0',
};

export default ArrowDownIcon;
