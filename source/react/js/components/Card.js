import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/card.scss';

import Chart from './Chart';
import ColumnChart from '../data/ColumnChart';
import SankeyClass from '../data/sankey';
import ExpandIcon from './icons/Expand';
import CardFooterButtons from './CardFooterButtons';
import LegendItem from './LegendItem';
import TableModal from './TableModal';
import ExpandCollapse from './ExpandCollapse';
import generateUniqueId from '../utils/misc';
import ScatterChart from '../data/ScatterChart';
import Boxplot from '../data/Boxplot';

class Card extends Component {
  static propTypes = {
    onExpand: PropTypes.func,
    onDownload: PropTypes.func,
    // sk: TODO: possible to remove id now that we have `chart`?
    id: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isMobileView: PropTypes.bool,
    chartData: PropTypes.shape({}).isRequired,
  }

  static defaultProps = {
    onExpand: null,
    onDownload: null,
    isMobileView: false,
  }

  constructor(props) {
    super(props);

    this.initialState = {
      highchartData: null,
      isSankey: false,
      over: false,
      currentChart: 'ChartModal',
      chartContainerId: generateUniqueId({ name: 'chart-container' })
    };

    this.state = this.initialState;
    this.tableRef = React.createRef();
  }

  componentWillMount() {
    const { chartData } = this.props;
    const highchartData = this.generateHighchartData({ chartData });

    this.setState({
      ...this.state,
      isSankey: chartData.chart_config.type === 'sankey',
      highchartData,
    });
  }

  handleExpand = () => {
    const {
      id,
      onExpand,
      chartData,
    } = this.props;
    const { highchartData, chart } = this.state;
    if (onExpand) {
      const csv = chart.getCSV();
      const svg = chart.getSVG();
      const table = chart.getTable();
      const wdpTitle = chartData.chart_config.title;
      const wdpShortTitle = chartData.chart_config.short_title;
      const filename = wdpShortTitle || wdpTitle;
      const categories = chartData.categories ? chartData.categories.split(',') : ['from', 'to', 'weight'];
      onExpand({
        id,
        type: 'ChartModal',
        data: highchartData,
        categories,
        filename,
        csv,
        svg,
        table,
      });
    }
  };

  // TODO: refactor; chart config manipulation should not be happening in a Card component
  generateHighchartData = ({ chartData }) => {
    switch (chartData.chart_config.type) {
      case 'sankey': {
        // Create an empty nodes object to fill with unique to/from names
        const nodes = {};
        const sankeySeries = chartData.chart_data[0].sankey_data.map((data) => {
          // Each sankey line is a csv string
          const dataLine = data.split(',');
          // Sankey count
          const weight = Number(dataLine[3]);
          // Step used to create unique names for each stage
          const step = Number(dataLine[2]);
          // From is created by program combined with step
          const from = (`${dataLine[0].trim()}-${step.toString().trim()}`);
          // To is created by program combined with step + 1
          const to = (`${dataLine[1].trim()}-${(step + 1).toString().trim()}`);
          // Populates the nodes object with unique entries
          nodes[from] = from;
          nodes[to] = to;
          // Returns the series data for the sankey chart
          return ({ to, from, weight });
        });
        const sankeyChart = SankeyClass.config({sankeySeries});
        sankeyChart.series[0].data = sankeySeries;
        // Strips the step number from the displayed name
        sankeyChart.series[0].nodes = Object.keys(nodes).map(nodeId => ({
          id: nodes[nodeId],
          name: nodes[nodeId].substring(0, nodes[nodeId].length - 2),
        }));
        sankeyChart.chartDescription = chartData.chart_config.description;
        sankeyChart.title.wdpTitle = chartData.chart_config.title;
        // pushing the shortTitle for export purposes
        sankeyChart.title.wdpShortTitle = chartData.chart_config.shortTitle;

        return sankeyChart;
      }
    
      case 'scatter_chart': {
        return ScatterChart.config({
          chart: chartData,
          chartSeries: chartData.chart_data.map((data) => ({
            name: data.series_name,
            data: JSON.parse(data.series_data)
          }))
        });
      }
    
      case 'boxplot': {
        return Boxplot.config({
          chart: chartData,
          categories: chartData.categories ? chartData.categories.split(',') : [],
          chartSeries: chartData.chart_data.map((data, i) => ({
            name: data.series_name,
            data: JSON.parse(data.series_data),
            outliers: data.series_outliers ? JSON.parse(data.series_outliers) : null,
            type: 'boxplot',
            id: `series_${i}`
          }))
        });
      }
      
      default: { // column_chart or line_chart
        const chartSeries = chartData.chart_data.map((data) => {
          const seriesOptions = {
            name: data.series_name,
            data: JSON.parse(data.series_data),
          };
          if (Object.prototype.hasOwnProperty.call(data, 'dual_axis_type')) {
            if (data.dual_axis_type === 'line') {
              seriesOptions.type = 'spline';
              seriesOptions.yAxis = 1;
            }
          }
    
          return seriesOptions;
        });

        const categories = chartData.categories.split(',');

        return ColumnChart.config({
          chart: chartData,
          categories,
          chartSeries,
          distributionView: false,
        });
      }
    }
  };

  // generateCSV = ({ highchartData, categories }) => {
  //   const strungData = highchartData.series.map(({ name, data }) => `${name},${data.join(',')}`);
  //   let csv = `Name,${categories}\n`;
  //   strungData.forEach((item) => {
  //     csv += `${item}\n`;
  //   });
  // };

  // TODO: Make this more DRY -- see ProgramsCard.js
  handleCardFooterButtonChange = ({ tabId, label, type }) => {
    const {
      id,
      onExpand,
      chartData,
      onDownload,
    } = this.props;

    const { highchartData, chart, currentChart } = this.state;
    const { wdpShortTitle, wdpTitle } = highchartData.title;
    const filename = wdpShortTitle || wdpTitle;
    const categories = chartData.categories ? chartData.categories.split(',') : ['from', 'to', 'weight'];
    // tabId 0 === view table
    if (onExpand && tabId === 0) {
      const newCurrentChart = currentChart === 'ChartModal' ? 'TableModal' : 'ChartModal';

      this.setState({ ...this.state, currentChart: newCurrentChart });
    } else if (onDownload && tabId === 1) {

      if(currentChart === 'ChartModal'){
        chart.exportChart({
          type: type,
          filename: filename
        });
      } else {
        onDownload({ csv: this.tableRef, filename });
      }
    }
  }


  // TODO: Make this more DRY -- see ProgramsCard.js
  handleChartMount = ({ chart }) => {
    this.setState({
      ...this.state,
      chart,
    });
  }

  onMouseOver = () => {
    this.setState({
      ...this.state,
      over: true,
    });
  }

  onMouseOut = () => {
    this.setState({
      ...this.state,
      over: false,
    });
  }

  render() {
    const {
      isSankey,
      highchartData,
      over,
      currentChart,
      chart,
      chartContainerId
    } = this.state;
    const {
      isActive,
      isMobileView,
      chartData,
    } = this.props;

    const cardStyle = classnames(
      style.card,
      style.sticky,
      { [style.active]: isActive },
      { [style.over]: over },
    );

    const categories = chartData.categories ? chartData.categories.split(',') : ['from', 'to', 'weight'];

    let data = highchartData;
    const dataNote = chartData.chart_config.data_notes
    const { series, colors, title } = data;
    const legendLabels = series.map(({ name }) => name);
    if (data.legend && !data.legend.forceShow) {
      // eslint-disable-next-line no-param-reassign
      data.legend.enabled = false;
    }

    let footerLabels;
    switch (currentChart) {
      case 'ChartModal':
        footerLabels = ['View Table', 'Download This Chart'];
        break;
      case 'TableModal':
        footerLabels = ['View Chart', 'Download This Table'];
        break;
      default:
        footerLabels = ['---', '---'];
    }

    return (
      <div className={style.root}>
        <div className={cardStyle}>
          <div className={style.shadowWrapper}>
            <div className={style.chartWrapper}>
              <div className={style.chartMargins} id={chartContainerId}>
                <Fragment>
                  <div className={`${style.chartContainer} ${currentChart === 'ChartModal' ? '' : style.hidden}`}>
                    <div className={style.meta}>
                      <h3>{title.wdpTitle}</h3>
                      {!isSankey && !data.chart.type == 'boxplot' && !data.legend.forceShow && (
                        <ul>
                          {legendLabels.map((label, i) => (
                            <LegendItem
                              key={label}
                              label={label}
                              color={colors[i]}
                            />
                          ))}
                        </ul>
                      )}
                      <div className={style.description}>
                        {data.chartDescription}
                      </div>
                      {dataNote && <ExpandCollapse title={'Data Notes'} content={dataNote} />}
                    </div>
                    <div className={style.rightWrapper}>
                      <Chart
                        size={isMobileView ? 'small' : 'medium'}
                        isSankey={isSankey}
                        data={highchartData}
                        onMount={this.handleChartMount}
                      />
                    </div>
                  </div>
                  <div className={`${style.tableContainer} ${currentChart === 'TableModal' ? '' : style.hidden}`}>
                    <TableModal
                      data={highchartData}
                      categories={categories}
                      isSankey={isSankey}
                      table={chart}
                      tableRef={this.tableRef}
                    />
                  </div>
                </Fragment>
              </div>
            </div>
          </div>
          <CardFooterButtons
            labels={footerLabels}
            onChange={this.handleCardFooterButtonChange}
            chartContainerId={chartContainerId}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Card);
