import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

const CloseIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox={`0 0 24 24`} {...props}>
      <g stroke={fill} fill="none" fillRule="evenodd">
        <path d="M6 6L18 18M18 6L6 18L18 6Z" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </Icon>
  );
};

CloseIcon.propTypes = {
  fill: PropTypes.string,
};

CloseIcon.defaultProps = {
  fill: '#3194E0',
};

export default CloseIcon;
