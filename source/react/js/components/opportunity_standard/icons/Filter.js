import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

const FilterIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox={`0 0 24 24`} {...props}>
      <g stroke={fill} fill="none" fillRule="evenodd">
        <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </Icon>
  );
};

FilterIcon.propTypes = {
  fill: PropTypes.string,
};

FilterIcon.defaultProps = {
  fill: '#3194E0',
};

export default FilterIcon;
