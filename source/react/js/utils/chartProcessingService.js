import ColumnChart from "../data/ColumnChart";
import { joinQuarterString } from "./misc";

class ChartProcessingService {
  // A service that helps transform backend data into a final Highcharts object.

  constructor({ chart, filters, populationOptions }) {
    // chart: Object, // the 'visualization' field of a common metric object
    // filters: {
    //   distributionView: bool,
    //   populations: Array[str], // values of actively filtered populations; if empty, show all
    //   timescale: str, // 'year' or 'quarter',
    //   timeframe: {
    //     startYear: str, // e.g. '2017'
    //     endYear: str,
    //     startQuarter: str, // e.g. 'Q1'
    //     endQuarter: str
    //   }
    // },
    // populationOptions: Array[{ key, value }] // Key-value objects of all available populations

    this.chart = chart;
    this.filters = filters;
    this.populationOptions = populationOptions;
  }

  getPeriodsFromTimeframe() {
    const { timescale, timeframe } = this.filters;
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4']
  
    const yearPeriods = _.range(
      parseInt(timeframe.startYear), parseInt(timeframe.endYear) + 1
    ).map(intYear => intYear.toString())
  
    if (timescale == 'year') {
      // We want to return periods in the format '2017', '2018'...
      return yearPeriods
    } else if (timescale == 'quarter') {
      // We want to return periods in the format '2017-Q1', '2017-Q2'...
      let quarterPeriods = []
  
      // For each year, determine which quarters to add
      yearPeriods.forEach(year => {
        if (year == timeframe.startYear && year == timeframe.endYear) {
          // Push the quarters inbetween the selected start and end quarter
          quarterPeriods.push(
            ...quarters.slice(
              quarters.indexOf(timeframe.startQuarter), quarters.indexOf(timeframe.endQuarter) + 1
            ).map(quarter => joinQuarterString(year, quarter))
          )
        } else if (year == timeframe.startYear) {
          // Push the quarters starting from the selected start quarter
          quarterPeriods.push(
            ...quarters.slice(
              quarters.indexOf(timeframe.startQuarter), quarters.length
            ).map(quarter => joinQuarterString(year, quarter))
          )
        } else if (year == timeframe.endYear) {
          // Push the quarters up to the selected end quarter
          quarterPeriods.push(
            ...quarters.slice(
              0, quarters.indexOf(timeframe.endQuarter) + 1
            ).map(quarter => joinQuarterString(year, quarter))
          )
        } else {
          // Start and end quarter selection doesn't concern this year; push all quarters
          quarterPeriods.push(...quarters.map(quarter => joinQuarterString(year, quarter)))
        }
      })
  
      return quarterPeriods
    }
  }

  buildCommonMetricChart() {
    const { distributionView } = this.filters;
      
    const { aggregrateBy, type, decimalPoints } = this.chart.chart_config;
    const sortedFacts = this._filterFacts();
    let years = _.uniq(sortedFacts.map(({ period }) => period));
    const series = this._getAggregrateCounts(sortedFacts, aggregrateBy, decimalPoints);
    let max = -Infinity;
    let lineMax = -Infinity;
    const chartSeries = [];

    if (type === 'dual_axis') {
      const lineSortedFacts = this._filterLineFacts();
      const lineSeries = this._getAggregrateCounts(lineSortedFacts, aggregrateBy, decimalPoints);
      years = _.uniq(lineSortedFacts.map(({ period }) => period));

      Object.keys(lineSeries).forEach((year, i) => {
        Object.keys(lineSeries[year]).forEach((subgroup) => {
          // does this subgroup exist?
          // if not, create the series data with the value in the correct position
          const value = lineSeries[year][subgroup];
          if (!this._checkSubgroupExistence({
            value: subgroup,
            array: chartSeries,
          })) {
            const seriesData = {
              name: subgroup,
              data: Array(years.length).fill(0),
              type: 'column',
              stacking: 'percent',
              yAxis: 0,
            };
            if (!distributionView){
              seriesData.type = 'spline';
              seriesData.yAxis = 1;
              seriesData.stacking = undefined;
            }
            seriesData.data[i] = Number(value);
            chartSeries.push(seriesData);
  
            lineMax = (lineMax < value) ? value : lineMax;
          } else {
          // otherwise we already have this subgroup
          // which means we need to know which series to target
            const idx = _.findIndex(chartSeries, { name: subgroup });
            // and update the data array in the correct position
            chartSeries[idx].data[i] = lineSeries[year][subgroup];
            lineMax = (lineMax < value) ? value : lineMax;
          }
        });
      });
    }

    Object.keys(series).forEach((year) => {
      Object.keys(series[year]).forEach((subgroup) => {
        // does this subgroup exist?
        // if not, create the series data with the value in the correct position
        const value = series[year][subgroup];
        const yearIndex = years.indexOf(year);
        if (!this._checkSubgroupExistence({
          value: subgroup,
          array: chartSeries,
        })) {
          const seriesData = {
            name: subgroup,
            data: Array(years.length).fill(0),
          };
          
          if (type === 'dual_axis') {
            seriesData.stacking = distributionView ? 'percent' : undefined;
          }
  
          seriesData.data[yearIndex] = Number(value);
          chartSeries.push(seriesData);
  
          max = (max < value) ? value : max;
        } else {
          // otherwise we already have this subgroup
          // which means we need to know which series to target
          const idx = _.findIndex(chartSeries, { name: subgroup });
          // and update the data array in the correct position
          chartSeries[idx].data[yearIndex] = series[year][subgroup];
          max = (max < value) ? value : max;
        }
      });
    });
  
    return ColumnChart.config({
      chart: this.chart,
      categories: years,
      chartSeries,
      distributionView: type === 'dual_axis' ? false : distributionView,
      dualDistribution: distributionView
    });
  }

  _getActiveProgramLabels() {
    // Get the keys of the selected population/program values
    return this.filters.populations.map(val =>
      this.populationOptions.find(option => option.value == val).key
    )
  }
  
  _getAggregrateCounts(facts, aggregrateBy, decimalPoints) {
    const series = {};
  
    facts.forEach(fact => {
      const { period } = fact;
      let count = Number(fact.metric_count);
      
      if (decimalPoints >= 0) {
        count = Number(Math.round(fact.metric_count+`e${decimalPoints}`)+`e-${decimalPoints}`);
      }
  
      const category = fact[`${aggregrateBy}`];
  
      if (!series[period]) {
        series[period] = {
          [`${category}`]: count,
        };
      } else if (!series[period][`${category}`]) {
        series[period][`${category}`] = Number(count.toFixed(2));
      } else {
        series[period][`${category}`] += Number(count.toFixed(2));
      }
    });
    return series;
  }

  _filterFacts() {
    const programLabels = this._getActiveProgramLabels();
    const dateRange = this.getPeriodsFromTimeframe();
    const facts = _.filter(this.chart.facts, fact => ((dateRange.includes(fact.period))
      && (programLabels.length === 0 || programLabels.includes(fact.program))
    ));
    return (_.sortBy(facts, 'period'));
  };

  _checkSubgroupExistence({ value, array }) {
    return array.some(({ name }) => name === value)
  }

  _filterLineFacts() {
    const programLabels = this._getActiveProgramLabels();
    const dateRange = this.getPeriodsFromTimeframe();
    const facts = _.filter(chart.line_facts, fact => ((dateRange.includes(fact.period))
      && (programLabels.length === 0 || programLabels.includes(fact.program))));
    return (_.sortBy(facts, 'period'));
  }
}

export default ChartProcessingService;