import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';
import style from '../../styles/components/svg/data-story-card-bar.scss';
import { getRandomColors } from '../../utils/misc'
const DataStoryCardBar = (props) => {
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
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="240"
      height="236"
      viewBox="0 0 240 236"
      className={rootStyle}
    >
      <defs>
        <polygon id="graph-horizontal-copy-b" points="0 0 200 0 200 8 0 8" />
        <polygon id="graph-horizontal-copy-d" points="0 64 224 64 224 72 0 72" />
        <polygon id="graph-horizontal-copy-f" points="0 128 212 128 212 136 0 136" />
        <polygon id="graph-horizontal-copy-h" points="0 192 168 192 168 200 0 200" />

        <polygon id="graph-horizontal-copy-j" points="0 36 120 36 120 44 0 44" />
        <polygon id="graph-horizontal-copy-l" points="0 100 168 100 168 108 0 108" />
        <polygon id="graph-horizontal-copy-n" points="0 164 96 164 96 172 0 172" />
        <polygon id="graph-horizontal-copy-p" points="0 228 172 228 172 236 0 236" />

        <polygon id="graph-horizontal-copy-r" points="0 12 160 12 160 20 0 20" />
        <polygon id="graph-horizontal-copy-t" points="0 76 136 76 136 84 0 84" />
        <polygon id="graph-horizontal-copy-v" points="0 140 240 140 240 148 0 148" />
        <polygon id="graph-horizontal-copy-x" points="0 204 180 204 180 212 0 212" />

        <polygon id="graph-horizontal-copy-z" points="0 24 180 24 180 32 0 32" />
        <polygon id="graph-horizontal-copy-B" points="0 88 196 88 196 96 0 96" />
        <polygon id="graph-horizontal-copy-D" points="0 152 204 152 204 160 0 160" />
        <polygon id="graph-horizontal-copy-F" points="0 216 216 216 216 224 0 224" />

      </defs>
      <g fill="none" fillRule="evenodd">
        <use fill="#000" filter="url(#graph-horizontal-copy-a)" xlinkHref="#graph-horizontal-copy-b" />
        <use fill={randColors[0]} xlinkHref="#graph-horizontal-copy-b" />
        <use fill="#000" filter="url(#graph-horizontal-copy-c)" xlinkHref="#graph-horizontal-copy-d" />
        <use fill={randColors[0]} xlinkHref="#graph-horizontal-copy-d" />
        <use fill="#000" filter="url(#graph-horizontal-copy-e)" xlinkHref="#graph-horizontal-copy-f" />
        <use fill={randColors[0]} xlinkHref="#graph-horizontal-copy-f" />
        <use fill="#000" filter="url(#graph-horizontal-copy-g)" xlinkHref="#graph-horizontal-copy-h" />
        <use fill={randColors[0]} xlinkHref="#graph-horizontal-copy-h" />
        <use fill="#000" filter="url(#graph-horizontal-copy-i)" xlinkHref="#graph-horizontal-copy-j" />
        <use fill={randColors[1]} xlinkHref="#graph-horizontal-copy-j" />
        <use fill="#000" filter="url(#graph-horizontal-copy-k)" xlinkHref="#graph-horizontal-copy-l" />
        <use fill={randColors[1]} xlinkHref="#graph-horizontal-copy-l" />
        <use fill="#000" filter="url(#graph-horizontal-copy-m)" xlinkHref="#graph-horizontal-copy-n" />
        <use fill={randColors[1]} xlinkHref="#graph-horizontal-copy-n" />
        <use fill="#000" filter="url(#graph-horizontal-copy-o)" xlinkHref="#graph-horizontal-copy-p" />
        <use fill={randColors[1]} xlinkHref="#graph-horizontal-copy-p" />
        <use fill="#000" filter="url(#graph-horizontal-copy-q)" xlinkHref="#graph-horizontal-copy-r" />
        <use fill={randColors[2]} xlinkHref="#graph-horizontal-copy-r" />
        <use fill="#000" filter="url(#graph-horizontal-copy-s)" xlinkHref="#graph-horizontal-copy-t" />
        <use fill={randColors[2]} xlinkHref="#graph-horizontal-copy-t" />
        <use fill="#000" filter="url(#graph-horizontal-copy-u)" xlinkHref="#graph-horizontal-copy-v" />
        <use fill={randColors[2]} xlinkHref="#graph-horizontal-copy-v" />
        <use fill="#000" filter="url(#graph-horizontal-copy-w)" xlinkHref="#graph-horizontal-copy-x" />
        <use fill={randColors[2]} xlinkHref="#graph-horizontal-copy-x" />
        <use fill="#000" filter="url(#graph-horizontal-copy-y)" xlinkHref="#graph-horizontal-copy-z" />
        <use fill={randColors[3]} xlinkHref="#graph-horizontal-copy-z" />
        <use fill="#000" filter="url(#graph-horizontal-copy-A)" xlinkHref="#graph-horizontal-copy-B" />
        <use fill={randColors[3]} xlinkHref="#graph-horizontal-copy-B" />
        <use fill="#000" filter="url(#graph-horizontal-copy-C)" xlinkHref="#graph-horizontal-copy-D" />
        <use fill={randColors[3]} xlinkHref="#graph-horizontal-copy-D" />
        <use fill="#000" filter="url(#graph-horizontal-copy-E)" xlinkHref="#graph-horizontal-copy-F" />
        <use fill={randColors[3]} xlinkHref="#graph-horizontal-copy-F" />
      </g>
    </svg>
  );
};

DataStoryCardBar.propTypes = {
  animate: PropTypes.bool,
};

DataStoryCardBar.defaultProps = {
  animate: false,
};

export default withStyles(style)(DataStoryCardBar);
