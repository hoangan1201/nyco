import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const ChevronUpIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 17 10" {...props}>
      <path d="M1 7.5l7.5 -7.5l7.5 7.5" stroke={fill} strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
};

ChevronUpIcon.propTypes = {
  fill: PropTypes.string,
};

ChevronUpIcon.defaultProps = {
  fill: '#3194E0',
};

export default ChevronUpIcon;
