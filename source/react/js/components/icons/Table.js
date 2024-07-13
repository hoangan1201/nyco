import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const TableIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 60 60" {...props}>
      <g fill="none" fillRule="evenodd">
        <path stroke={fill} strokeWidth="5" d="M35 4L35 57M2 18L52 18" />
        <polygon stroke={fill} strokeWidth="5" points="2 36 2 57 52 57 52 3.471 2 3.471" />
      </g>
    </Icon>
  );
};

TableIcon.propTypes = {
  fill: PropTypes.string,
};

TableIcon.defaultProps = {
  fill: '#3194E0',
};

export default TableIcon;
