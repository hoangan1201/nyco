import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/page-header.scss';

const PageHeader = ({
  image,
  title,
  tagline,
}) => (
  <section className={style.root}>
    {image && (
      <div className={style.image}>
        {image}
      </div>
    )}
    <div className={style.content}>
      <h1>
        {title}
      </h1>
      <div className={style.tagline}>
        {<div dangerouslySetInnerHTML={{__html:tagline}}/>}
      </div>
    </div>
  </section>
);

PageHeader.propTypes = {
  image: PropTypes.node,
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
};

export default withStyles(style)(PageHeader);
