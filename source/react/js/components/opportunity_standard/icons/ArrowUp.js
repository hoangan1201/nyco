import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

const ArrowUpIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox={`0 0 24 24`} {...props}>
      <g stroke={fill} fill="none" fillRule="evenodd">
        <path d="M12 19V5" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12L12 5L19 12" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </Icon>
  );
};

ArrowUpIcon.propTypes = {
  fill: PropTypes.string,
};

ArrowUpIcon.defaultProps = {
  fill: '#3194E0',
};

export default ArrowUpIcon;
