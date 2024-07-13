import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../../styles/components/opportunity_standard/alert-box.scss'
import FeatherInfoIcon from '../opportunity_standard/icons/FeatherInfo';

const AlertBox = (props) => {
  return (
    <div className={`${style.alert} ${style[props.color]}`} data-is-alert tabIndex={0}>
      <div className={style.iconContainer}>
        <FeatherInfoIcon size={20} />
      </div>

      <span className={style.infoContainer}>{ props.info }</span>
    </div>
  )
}

AlertBox.propTypes = {
  info: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default withStyles(style)(AlertBox);