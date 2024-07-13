import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const NYCIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 40 12" {...props}>
      <g fill={fill} fillRule="evenodd">
        <g fillRule="nonzero">
          <path d="M36.942 0H28.51L26 2.308v7.797l2.51 2.308h8.432l2.511-2.308V7.753l-.853-.784h-4.216v.784h-3.363V4.661h3.363v.783H38.6l.853-.783V2.308zM12.603 0H9.251l-.849.784v3.092L4.201 0H.85L0 .784v10.845l.85.784h3.351l.85-.784V8.537l4.2 3.876h3.352l.849-.784V.784z" />
          <path d="M18.051 12.413h3.351l.849-.784V9.321l4.201-3.877V.784L25.603 0h-3.352l-.849.784v1.524l-1.699 1.568-1.652-1.568V.784L17.201 0H13.85L13 .784v4.66l4.201 3.877v2.308z" />
        </g>
      </g>
    </Icon>
  );
};

NYCIcon.propTypes = {
  fill: PropTypes.string,
};

NYCIcon.defaultProps = {
  // fill: '#ffffff',
  fill:'#080707',
};

export default NYCIcon;
