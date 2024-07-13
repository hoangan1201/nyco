import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';
import style from '../../styles/components/svg/data-story-card-histogram.scss';
import { getRandomColors } from '../../utils/misc'

const DataStoryCardHistogram = (props) => {
  const {
    animate, colors
  } = props;

  const rootStyle = classnames(
    style.root,
    { [style.hidden]: !animate },
    { [style.animationStart]: animate },
  );
  const randColors =  getRandomColors(colors,7);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="240"
      height="240"
      viewBox="0 0 240 240"
      className={rootStyle}
    >
      <g transform="scale(1,-1) translate(0,-240)">
        <rect width="20" height="128" y="0" fill={randColors[0]} />
        <rect width="20" height="148" x="20" y="0" fill={randColors[1]} />
        <rect width="20" height="164" x="40" y="0" fill={randColors[2]} />
        <rect width="20" height="140" x="60" y="0" fill={randColors[3]} />
        <rect width="20" height="148" x="80" y="0" fill={randColors[4]} />
        <rect width="20" height="188" x="100" y="0" fill={randColors[5]} />
        <rect width="20" height="212" x="120" y="0" fill={randColors[0]} />
        <rect width="20" height="240" x="140" fill={randColors[1]} />
        <rect width="20" height="196" x="160" y="0" fill={randColors[2]} />
        <rect width="20" height="128" x="180" y="0" fill={randColors[3]} />
        <rect width="20" height="136" x="200" y="0" fill={randColors[4]} />
        <rect width="20" height="156" x="220" y="0" fill={randColors[5]} />
      </g>
    </svg>
  );
};

DataStoryCardHistogram.propTypes = {
  animate: PropTypes.bool,
};

DataStoryCardHistogram.defaultProps = {
  animate: false,
};

export default withStyles(style)(DataStoryCardHistogram);
