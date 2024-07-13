import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/agency-card.scss';
import NavigationLink from './NavigationLink';

const AgencyCard = ({
  image, title, desc, url,
}) => (
  <div className={style['agency-card']}>
    <div className={style['image-wrapper']}>
      {image}
    </div>
    <div className={style.meta}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <NavigationLink
        url={url}
        label="View Agency Site"
        isExternal="true"
      />
    </div>
  </div>
);

AgencyCard.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default withStyles(style)(AgencyCard);
