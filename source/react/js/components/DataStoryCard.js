import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ArrowRightIcon from './icons/ArrowRight';

import style from '../styles/components/data-story-card.scss';

const DataStoryCard = ({
  title, text, icon, slug, locale,
}) => (
  <div className={style.root}>
    <NavLink to={`/${locale}/data-stories/${slug}`}>
      <div className={style.header} role="heading" aria-level="4">
        <span>{title}</span>
        <ArrowRightIcon size={12} />
      </div>
      <div className={style.body}>
        <div className={style['icon-wrapper']}>
          {icon}
        </div>
        <p className={style.sm}>{text}</p>
      </div>
    </NavLink>
  </div>
);

DataStoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

// DataStoryCard.defaultProps = {};

export default withStyles(style)(DataStoryCard);
