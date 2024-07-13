import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';
import style from '../../styles/components/svg/data-story-card-column.scss';
import { getRandomColors } from "../../utils/misc";

const DataStoryCardColumn = (props) => {
  const {
    animate,
    colors,
  } = props;

  const rootStyle = classnames(
    style.root,
    { [style.hidden]: !animate },
    { [style.animationStart]: animate },
  );
  const randColors = getRandomColors(colors, 5)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="240"
      height="240"
      viewBox="0 0 240 240"
      className={rootStyle}
    >
      <g transform="scale(1,-1) translate(0,-240)">
        <rect width="32" height="168" y="0" fill={randColors[0]} />
        <rect width="32" height="188" x="52" y="0" fill={randColors[1]} />
        <rect width="32" height="168" x="104" y="0" fill={randColors[2]} />
        <rect width="32" height="208" x="156" y="0" fill={randColors[3]} />
        <rect width="32" height="240" x="208" fill={randColors[4]} />
      </g>
    </svg>
  );
};

DataStoryCardColumn.propTypes = {
  animate: PropTypes.bool,
};

DataStoryCardColumn.defaultProps = {
  animate: false,
};

export default withStyles(style)(DataStoryCardColumn);
