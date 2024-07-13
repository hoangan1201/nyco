import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';
import { getRandomColors } from "../../utils/misc";
import style from '../../styles/components/svg/data-story-card-sankey.scss';

const DataStoryCardSankey = (props) => {
  const {
    animate, colors
  } = props;

  const rootStyle = classnames(
    style.root,
    { [style.hidden]: !animate },
    { [style.animationStart]: animate },
  );
  const randColors = getRandomColors(colors, 7);
  return (
    <svg
      id="data-story-card-sankey"
      xmlns="http://www.w3.org/2000/svg"
      width="238"
      height="237"
      viewBox="0 0 238 237"
      className={rootStyle}
    >
      <g fill="none" fillRule="evenodd">

        <path fill={randColors[0]} fillRule="nonzero" d="M0.93442623,70.8196721 L0.93442623,31.4754098 C48.8181144,31.4754098 87.4507431,26.4905545 116.680765,16.7472138 C150.294208,5.54273305 189.093339,0 233.065574,0 L233.065574,39.3442623 C193.103382,39.3442623 158.459891,44.2933325 129.122513,54.0724583 C95.4017159,65.3127242 52.7228692,70.8196721 0.93442623,70.8196721 Z" />

        <path fill={randColors[1]} fillRule="nonzero" d="M0.93442623,125.901639 L0.93442623,86.557377 C70.1057085,86.557377 115.597107,101.721176 135.835926,135.452543 C138.234731,139.45055 140.412473,143.323986 143.118153,148.32518 C143.815643,149.614424 146.08252,153.833002 146.164181,153.984557 C147.292237,156.078115 148.132236,157.617058 148.9361,159.055472 C155.762136,171.2698 160.343382,176.332615 168.729252,180.286585 C180.598095,185.882791 200.52568,188.852459 233.065574,188.852459 L233.065574,228.196721 C161.849846,228.196721 135.583333,215.811959 114.59124,178.249261 C115.399346,179.695265 105.31789,161.060649 102.0985,155.694998 C90.8619096,136.967348 57.6647833,125.901639 0.93442623,125.901639 Z" />

        <path fill={randColors[2]} fillRule="nonzero" d="M0.93442623,180.983607 L0.93442623,141.639344 C58.6002478,141.639344 97.2602287,145.781485 118.847593,155.033213 C133.531357,161.326254 172.289153,163.826757 232.246612,161.32853 L233.884535,200.638683 C167.940355,203.386358 125.386676,200.640959 103.349129,191.196296 C88.2151811,184.710318 53.4325391,180.983607 0.93442623,180.983607 Z" />

        <path fill={randColors[3]} fillRule="nonzero" d="M0.776105679,236.064937 L1.09274678,196.721949 C67.6182676,197.257361 95.3606557,183.864484 95.3606557,161.311475 C95.3606557,127.095945 111.1791,101.971227 140.043383,87.351991 C163.066654,75.691122 193.627683,70.8196721 233.065574,70.8196721 L233.065574,110.163934 C164.64762,110.163934 134.704918,125.329369 134.704918,161.311475 C134.704918,187.840987 120.627832,208.455081 95.0606374,220.797865 C72.8353054,231.527336 41.5548776,236.393133 0.776105679,236.064937 Z" />

        <rect className="bar1" width="7.869" height="78.689" x=".934" fill={randColors[0]} />
        <rect className="bar2" width="7.869" height="55.082" x=".934" y="78.689" fill={randColors[1]} />
        <rect className="bar3" width="7.869" height="55.082" x=".934" y="133.77" fill={randColors[2]} />
        <polygon className="bar4" fill={randColors[3]} points=".934 188.852 8.803 188.852 8.803 236.066 .934 236.066" />

        <polygon className="bar5" fill={randColors[0]} points="229.131 0 237 0 237 137.705 229.131 137.705" />
        <rect className="bar6" width="7.869" height="98.361" x="229.131" y="137.705" fill={randColors[1]} />
      </g>
    </svg>
  );
};

DataStoryCardSankey.propTypes = {
  animate: PropTypes.bool,
};

DataStoryCardSankey.defaultProps = {
  animate: false,
};

export default withStyles(style)(DataStoryCardSankey);
