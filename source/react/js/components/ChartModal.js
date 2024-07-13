import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/chart-modal.scss';
import Chart from './Chart';
import LegendItem from './LegendItem';
import ExpandCollapse from './ExpandCollapse';

const ChartModal = ({ data, size, onMount }) => {
  const { series, colors, title, dataNotes } = data;
  const legendLabels = series.map(({ name }) => name);
  data.chart.height = '500px';
  if (data.legend) {
    // Instead of diabling in both common metrics and data stories (and wherever else it
    // may appear we're changing the object here
    // eslint-disable-next-line no-param-reassign
    data.legend.enabled = true;
  }
  return (
    <div className={style.root}>
      <div className={style.meta}>
        <h3>{title.wdpTitle}</h3>
        <div className={style.description} dangerouslySetInnerHTML={{__html: data.chartDescription}} />
        {dataNotes && <ExpandCollapse title={'Data Notes'} content={dataNotes} />}
      </div>
      <div className={style.chartWrapper}>
        <Chart
          data={data}
          size={size}
          onMount={onMount}
        />
      </div>
    </div>
  );
};

ChartModal.propTypes = {
  data: PropTypes.shape({}).isRequired,
  size: PropTypes.oneOf([
    'small',
    'large',
  ]),
};

ChartModal.defaultProps = {
  size: 'small',
};

export default withStyles(style)(ChartModal);
