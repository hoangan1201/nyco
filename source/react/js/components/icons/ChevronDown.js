import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const ChevronDownIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 17 10" {...props}>
      <path d="M1 1l7.5 7.5L16 1" stroke={fill} strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
};

ChevronDownIcon.propTypes = {
  fill: PropTypes.string,
};

ChevronDownIcon.defaultProps = {
  fill: '#3194E0',
};

export default ChevronDownIcon;
