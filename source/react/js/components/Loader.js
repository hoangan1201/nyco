import React, { useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/loader.scss';

import GridLoader from './svg/GridLoader';
import { accessibilityDomAdjustments, addIdToTopHeading, focusOnHeaderLogo } from '../utils/accessibility';

const Loader = () => {
  useEffect(() => {
    return(() => {
      // When any full-screen loader closes, focus on the top page heading (for screen readers)
      setTimeout(() => {
        focusOnHeaderLogo();
        addIdToTopHeading();
        accessibilityDomAdjustments();
      }, 0) // Run on "next tick"
    })
  }, [])

  return (
    <div className={style.siteLoader}>
      <GridLoader />
    </div>
  );
}

export default withStyles(style)(Loader);
