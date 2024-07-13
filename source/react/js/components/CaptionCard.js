import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/caption-card.scss';

const CaptionCard = ({ content, caption }) => (
  <div className={`${style.root} ${caption ? style.divider : ''}`}>
    <div className={style.contentWrapper}>
      {content}
    </div>
    {caption && (
    <div className={style.caption}>
      {caption}
    </div>
    )}
  </div>
);

CaptionCard.propTypes = {
  content: PropTypes.node.isRequired,
  caption: PropTypes.string.isRequired,
};

export default withStyles(style)(CaptionCard);
