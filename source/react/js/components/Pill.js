import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/pill.scss';

class Pill extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { id, label, onClick } = this.props;

    return (
      <div className={style.root}>
        <div className={style.pill} onClick={() => onClick(id)}>
          <div className={style.content}>
            <span className={style.text}>{label}</span>
            <span className={style.circle}>
              <span className={style.close}></span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Pill);
