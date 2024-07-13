import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/introduction-section.scss';

const transition = {
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99],
};

const ColorBarAnimation = posed.div({
  // hidden: { scaleX: 0 },
  hidden: { scaleX: 0, transition },
  // visible: { scaleX: 1 },
  visible: { scaleX: 1, transition },
});

const ColorBar = ({
  width, height, color, isVisible,
}) => (
  <ColorBarAnimation
    pose={isVisible ? 'visible' : 'hidden'}
  >
    <div
      style={{
        width,
        backgroundColor: color,
        height,
        boxShadow: '0 1px 6px 0 rgba(0,0,0,0.20)',
      }}
    />
  </ColorBarAnimation>
);

ColorBar.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
};

ColorBar.defaultProps = {
  isVisible: true,
};

export default withStyles(style)(ColorBar);
