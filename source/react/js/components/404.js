import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/404.scss';

const FourOhFour = () => (
  <div className={style.root}>
    <h1>404</h1>
  </div>
);

export default withStyles(style)(FourOhFour);
