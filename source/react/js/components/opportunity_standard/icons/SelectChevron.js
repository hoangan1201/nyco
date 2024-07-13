import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

const SelectChevronIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox={`0 0 24 40`} {...props}>
      <g stroke={fill} fill="none" fillRule="evenodd">
        <path d="M6 25L12 31L18 25" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 15L12 9L6 15" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </Icon>
  );
};

SelectChevronIcon.propTypes = {
  fill: PropTypes.string,
};

SelectChevronIcon.defaultProps = {
  fill: '#3194E0',
};

export default SelectChevronIcon;
