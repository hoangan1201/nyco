import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import addSankeyModule from 'highcharts/modules/sankey';
import highchartsAccessibility from "highcharts/modules/accessibility";

import addExportingModule from 'highcharts/modules/exporting';
import addExportDataModule from 'highcharts/modules/export-data';
import addMapModule from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import proj4 from 'proj4';
import { mapAdded, sankeyAdded } from '../actions/highcharts';
import style from '../styles/components/chart.scss';

import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import ChartVoiceover from './ChartVoiceover';
NoDataToDisplay(Highcharts);

class Chart extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.shape({}).isRequired,
    isSankey: PropTypes.bool,
    isMap: PropTypes.bool,
    size: PropTypes.oneOf([
      'small',
      'medium',
      'large',
    ]),
    mapPresent: PropTypes.bool.isRequired,
    sankeyPresent: PropTypes.bool.isRequired,
    onMount: PropTypes.func,
    distributionView: PropTypes.bool,
    forceChartDescriptionInVoiceover: PropTypes.bool
  };

  static defaultProps = {
    isSankey: false,
    isMap: false,
    size: 'small',
    onMount: null,
    distributionView: false,
    forceChartDescriptionInVoiceover: false
  };

  constructor(props) {
    super(props);
    const { dispatch } = props;
    if (typeof Highcharts === 'object' && props.isSankey && !props.sankeyPresent) {
      addSankeyModule(Highcharts);
      dispatch(sankeyAdded());
    }
    highchartsAccessibility(Highcharts);
    HighchartsMore(Highcharts);



    // TODO: sk: not sure if these need to be in a check like we have above.
    addExportingModule(Highcharts);
    addExportDataModule(Highcharts);

    if (typeof Highcharts === 'object' && props.isMap && !props.mapPresent && !window.mapAdded) {
      addMapModule(Highcharts);
      dispatch(mapAdded());
      window.mapAdded = true;
    }

    if (window && !window.proj4) {
      window.proj4 = proj4;
    }
  }

  componentDidMount() {
    const { onMount } = this.props;
    if (onMount) {
      const { chart } = this.chart;
      onMount({ chart });
    }
  }

  render() {
    const { data, size, isMap, distributionView, forceChartDescriptionInVoiceover } = this.props;

    if(data.series.length === 0) {
      data.lang = { noData: 'No data available' }
      data.noData = {
        style: {
          fontSize: '1.4rem',
          color: '#c9eefe'
        }
      }
    }

    if(isMap){
      data.mapNavigation = {
        enabled: true,
        buttonOptions: {
          align: 'right',
          verticalAlign: 'bottom',
          theme:{
            fill: 'transparent',
            stroke: 'none',
          },
          x: -20,
          y: -20,
        },
        buttons: {
          zoomIn:{
            height: 50,
            padding: 0,
            style:{
              fontSize: '5rem',
              fontWeight: 'bolder',
              color: '#3194E0;'
            },
            width: 40,
            x: 0,
            y: 0,
          },
          zoomOut:{
            height: 50,
            padding: 0,
            style:{
              fontSize: '5rem',
              fontWeight: 'bolder',
              color: '#3194E0;'
            },
            width: 40,
            x: 0,
            y: 50,
          }
        }
      }
    }

    if (data.xAxis && data.xAxis.labels && data.xAxis.labels.style) {
      data.xAxis.labels.style = {
        ...data.xAxis.labels.style,
        color: '#97c9ef'
      }
    }

    if(data.title && data.title.wdpTitle) {
      data.exporting = {
        ...data.exporting,
        chartOptions: {
          title: {
            text: data.title.wdpTitle,
            style: {
              color: '#c9eefe'
            }
          }
        }
      }
    }

    if (distributionView) {
      data.yAxis.max = 110; // Add a bit of padding since all are 100%
      data.yAxis.endOnTick = false;
    } else {
      if (data.yAxis) {
        data.yAxis.max = null;
        data.yAxis.endOnTick = true;
      }
    }

    return (
      <section className={style.root}>
        <ChartVoiceover data={data} distributionView={distributionView} forceChartDescription={forceChartDescriptionInVoiceover} />
        <div className={`${style.chart} ${style[size]}`} aria-hidden={!isMap}>
          <HighchartsReact
            ref={(ref) => {
              this.chart = ref;
            }}
            highcharts={Highcharts}
            options={data}
            allowChartUpdate
            updateArgs={[true, true, true]}
            constructorType={isMap ? 'mapChart' : 'chart'}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ highcharts }) => {
  const { mapPresent, sankeyPresent } = highcharts;
  return {
    mapPresent,
    sankeyPresent,
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(style),
)(Chart);
