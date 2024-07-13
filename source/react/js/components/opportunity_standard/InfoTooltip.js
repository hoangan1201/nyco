import React from 'react';
import Tippy from '@tippyjs/react/headless';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../../styles/components/opportunity_standard/info-tooltip.scss';
import FeatherInfoIcon from './icons/FeatherInfo';

const InfoTooltip = ({ helpText }) => {
  return (
    <div className={`${style.infoTooltip}`}>
      <Tippy
        render={attrs => (
          <div className={ style.tipBox } tabIndex="-1" {...attrs}>
            { helpText }
          </div>
        )}
        zIndex={10002}
        placement="auto"
      >
        <div className={style.iconContainer}>
          <FeatherInfoIcon size={16} />
        </div>
      </Tippy>
    </div>
  )
}

export default withStyles(style)(InfoTooltip);