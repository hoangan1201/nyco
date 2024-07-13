import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';
import style from '../../styles/components/svg/data-story-card-dots.scss';
import { getRandomColors } from "../../utils/misc";

const DataStoryCardDots = (props) => {
  const {
    animate, colors
  } = props;

  const rootStyle = classnames(
    style.root,
    { [style.hidden]: !animate },
    { [style.animationStart]: animate },
  );
  const randColors = getRandomColors(colors, 7)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="240"
      height="240"
      viewBox="0 0 240 240"
      className={rootStyle}
    >
      <g fill="none" fillRule="evenodd">
        <circle cx="190" cy="50" r="10" fill={randColors[0]} />
        <circle cx="22" cy="222" r="10" fill={randColors[0]} />
        <circle cx="26" cy="70" r="10" fill={randColors[0]} />
        <circle cx="66" cy="174" r="10" fill={randColors[0]} />
        <circle cx="26" cy="154" r="10" fill={randColors[0]} />
        <circle cx="126" cy="50" r="10" fill={randColors[0]} />
        <circle cx="130" cy="110" r="10" fill={randColors[1]} />
        <circle cx="182" cy="70" r="10" fill={randColors[1]} />
        <circle cx="190" cy="222" r="10" fill={randColors[1]} />
        <circle cx="150" cy="162" r="10" fill={randColors[1]} />
        <circle cx="154" cy="186" r="10" fill={randColors[1]} />
        <circle cx="54" cy="114" r="10" fill={randColors[1]} />
        <circle cx="230" cy="230" r="10" fill={randColors[1]} />
        <circle cx="122" cy="162" r="10" fill={randColors[0]} />
        <circle cx="134" cy="126" r="10" fill={randColors[0]} />
        <circle cx="174" cy="78" r="10" fill={randColors[0]} />
        <circle cx="206" cy="94" r="10" fill={randColors[0]} />
        <circle cx="202" cy="122" r="10" fill={randColors[0]} />
        <circle cx="146" cy="110" r="10" fill={randColors[0]} />
        <circle cx="118" cy="94" r="10" fill={randColors[0]} />
        <circle cx="70" cy="94" r="10" fill={randColors[0]} />
        <circle cx="74" cy="22" r="10" fill={randColors[0]} />
        <circle cx="150" cy="70" r="10" fill={randColors[0]} />
        <circle cx="206" cy="46" r="10" fill={randColors[0]} />
        <circle cx="230" cy="10" r="10" fill={randColors[0]} />
        <circle cx="230" cy="158" r="10" fill={randColors[1]} />
        <circle cx="222" cy="166" r="10" fill={randColors[1]} />
        <circle cx="138" cy="202" r="10" fill={randColors[1]} />
        <circle cx="10" cy="230" r="10" fill={randColors[1]} />
        <circle cx="10" cy="10" r="10" fill={randColors[1]} />
        <circle cx="22" cy="22" r="10" fill={randColors[1]} />
        <circle cx="98" cy="202" r="10" fill={randColors[0]} />
        <circle cx="94" cy="50" r="10" fill={randColors[0]} />
        <circle cx="122" cy="62" r="10" fill={randColors[0]} />
        <circle cx="146" cy="30" r="10" fill={randColors[0]} />
        <circle cx="78" cy="74" r="10" fill={randColors[0]} />
        <circle cx="102" cy="38" r="10" fill={randColors[0]} />
        <circle cx="86" cy="114" r="10" fill={randColors[1]} />
        <circle cx="74" cy="174" r="10" fill={randColors[1]} />
        <circle cx="94" cy="154" r="10" fill={randColors[1]} />
        <circle cx="114" cy="114" r="10" fill={randColors[1]} />
        <circle cx="130" cy="78" r="10" fill={randColors[1]} />
        <circle cx="26" cy="138" r="10" fill={randColors[1]} />
        <circle cx="146" cy="130" r="10" fill={randColors[1]} />
        <circle cx="174" cy="130" r="10" fill={randColors[1]} />
        <circle cx="34" cy="146" r="10" fill={randColors[1]} />
        <circle cx="42" cy="190" r="10" fill={randColors[1]} />
        <circle cx="54" cy="198" r="10" fill={randColors[1]} />
        <circle cx="50" cy="230" r="10" fill={randColors[1]} />
      </g>
    </svg>
  );
};

DataStoryCardDots.propTypes = {
  animate: PropTypes.bool,
};

DataStoryCardDots.defaultProps = {
  animate: false,
};

export default withStyles(style)(DataStoryCardDots);
