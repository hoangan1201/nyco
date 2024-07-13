import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/chart-modal.scss';
import Chart from './Chart';
import ExpandCollapse from './ExpandCollapse';

const MapModal = ({
  data, description, title, size,
}) => (
  <div className={style.root}>
    <div className={style.meta}>
      {title && <h3>{title}</h3>}
      {description && (
        <div className={style.description}>
          {description}
        </div>
      )}
      {data.dataNotes && <ExpandCollapse title={'Data Notes'} content={data.dataNotes} />}
    </div>
    <div className={style.chartWrapper}>
      <Chart isMap data={data} size={size} />
    </div>
  </div>
);

MapModal.propTypes = {
  data: PropTypes.shape({}).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  size: PropTypes.oneOf([
    'small',
    'large',
  ]),
};

MapModal.defaultProps = {
  title: null,
  description: null,
  size: 'small',
};

export default withStyles(style)(MapModal);
