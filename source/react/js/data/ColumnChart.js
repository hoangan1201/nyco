import Highcharts from 'highcharts';

const titleNode = ({ text }) => ({
  text,
  style: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '13px',
  },
});

export default class ColumnChart {
  static config({
    chart,
    categories,
    chartSeries,
    distributionView,
    dualDistribution
  }) {
    const {
      type,
      yAxisTitle,
      xAxisTitle,
      decimalPoints,
      isYear,
      description,
      title,
      shortTitle
    } = chart.chart_config;


    const labelsNode = {
      style: {
        color: '#3194E0',
        fontFamily: "'Public Sans', 'Lato', sans-serif",
        fontSize: '13px'
      },
      formatter: function () {
        return isYear ? this.value : this.value.toLocaleString();
      }
    };
    const responsive = {
      rules: [{
        condition: {
          maxWidth: 5000
        },
        chartOptions: {plotOptions: {
          series: {
            // pointWidth: undefined,
            // groupPadding: 0.2
          }
        }}
      }]
    }

    const series = {
      groupPadding: .1,
      pointWidth: undefined,
      stacking: undefined,
      pointPadding: .1
    }

    if (distributionView) {
      series.stacking = 'percent';
      const totals = Array(chartSeries[0]?.data?.length).fill(0);

      chartSeries.map((series) => {
        series.data?.map((number, index) => {
          totals[index] += number;
          return null;
        });
        return null;
      });

      chartSeries.map((series) => {
        series.data?.map((number, index) => {
          // eslint-disable-next-line
          series.data[index] = Math.floor((number/totals[index]*10000))/100;
          return null;
        });
        return null;
      });
    }

    if (type === 'bar' || type === 'dual_axis' && !distributionView) {
      series.pointWidth = undefined
    } else if (type === 'stacked_bar_chart' || distributionView) {
      series.groupPadding = 0.05; // padding between series
      series.stacking = 'normal';
      
      if (distributionView && type !== 'dual_axis') {
        series.stacking = 'normal';
      }
    }

    let yAxis = {
      title: titleNode({ text: yAxisTitle }),
      gridLineColor: 'rgba(49, 148, 224, 0.25)',
      labels: labelsNode,
    };

    if (type === 'dual_axis') {
      const { secondaryYAxisTitle } = chart.chart_config;
      yAxis = [{ // Primary yAxis
        title: titleNode({ text: yAxisTitle }),
        gridLineColor: 'rgba(49, 148, 224, 0.25)',
        labels: labelsNode,
      }];
      if (!dualDistribution) {
        yAxis.push({ // Secondary yAxis
          title: titleNode({ text: distributionView ? '':secondaryYAxisTitle }),
          gridLineColor: 'rgba(49, 148, 224, 0.25)',
          labels: labelsNode,
          opposite: true,
          min: 0,
        })
      }
    }

    if(type ==='dual_axis' || type==='bar'){
      series.pointWidth= undefined
      series.groupPadding=.15;

      if (dualDistribution || distributionView) {
        series.stacking = 'percent';
        series.pointWidth= undefined
        series.groupPadding= 0.05;// padding between series
      }
    }

    let chartType = type === 'line_chart' ? 'line' : 'column';
    
    if (chartType === 'line' && chart.chart_config.isArea) {
      // Area chart is configured as a subtype of line charts
      chartType = 'area';
    }

    const decimals = decimalPoints == 0 ? '' : '.'.padEnd(decimalPoints + 1, '0');
    const getColors = () => {
      // Colors should go from more to less similar
      const colors = window.App.pages.colors;
      // Gets ideal incrementor for number of series
      let incrementor = Math.floor(colors.length / chartSeries.length);
      if (incrementor === 0) {
        incrementor = 1;
      }
      return chartSeries.map((_, i) => {
        // i = 0 gets first color, i = 1 gets last color, other colors go by increment
        let color = colors[i * incrementor];
        if (i === 1) {
          color = colors[colors.length - 1];
        }
        return color;
      });
    };

    return (
      {
        title: {
          text: '',
          wdpTitle: title,
          wdpShortTitle: shortTitle,
          helpText: title
        },
        chartDescription: description,
        accessibility: {},
        xAxis: {
          title: {
            style: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '13px',
              fontFamily: "'Public Sans', 'Lato', sans-serif"
            },
            margin: 25,
            text: xAxisTitle
          },
          lineColor: '#3194E0',
          lineWidth: 2,
          tickWidth: 0,
          categories,
          labels: labelsNode,
          zIndex: 4
        },
        yAxis,
        series: chartSeries.sort((a,b)=>a.name.localeCompare(b.name)),
        colors: getColors(),
        min: 0,
        plotOptions: {
          column: {
            borderWidth: 0,
          },
          custom: {
            isPercentage: !!distributionView
          },
          series,
        },
        legend: {
          enabled: !chart.hide_interactive_legend,
          layout: 'horizontal',
          maxHeight: 85,
          itemStyle: {
            fontFamily: "'Public Sans', 'Lato', sans-serif",
            fontWeight: 400,
            color: '#fff',
            fontSize: '13px',
            textDecoration: 'none',
          },
          margin: 30,
          itemMarginBottom: 10,
          symbolRadius: 0,
          itemHoverStyle: {
            color: '#C9EEFE',
            textDecoration: 'underline',
          },
          itemHiddenStyle: {
            color: '#003C7A',
          },
          navigation: {
            activeColor: '#C9EEFE',
            inactiveColor: '#031837',
            arrowSize: 10,
            style: {
              fontWeight: 'normal',
              color: '#fff',
              fontSize: '13px',
              fontFamily: "'Public Sans', 'Lato', sans-serif",
            },
          },
        },
        // responsive,
        tooltip: {
          enabled: !chart.hide_tooltips,
          backgroundColor: '#031837',
          borderWidth: 0,
          style: {
            color: '#031837',
            fontWeight: 'bold',
            fontFamily: 'Montserrat',
          },
          useHTML: true,
          headerFormat: '<div style="width: calc(100% + 13px); margin-top: -7px; margin-left: -7px; border-top: 6px solid #90C1D6; font-family: \'Public Sans\', \'Lato\', sans-serif"></div>'
          + '<h5 style="color: #90C1D6;text-align: center;padding: 10px 10px 0; font-size: 15px">{point.key}</h5>'
          + '<table style="width: 100%; padding: 0 10px 10px">',
          pointFormatter() {            
            let number = parseFloat(Number(this.y.toFixed(decimalPoints)));
            if (Number.isInteger(number)) {
              number = number.toLocaleString() + decimals;
            } else {
              number = number.toFixed(decimalPoints).toLocaleString();
            }
            
            const isPercentage = this.series.chart.options.plotOptions?.custom?.isPercentage;
          
            return `
              <tr>
                <td style="display: flex; justify-content: space-between; font-size: 13px; font-family: \'Public Sans\', \'Lato\', sans-serif">
                  <span style="color: ${this.series.color}; margin-right: 20px; max-width: 65%">
                    ${ this.series.name }:
                  </span>
                  <span style="text-align: right; color: #C9EEFE"><b>${ number }${ isPercentage ? '%' : '' }</b></span>
                </td>
              </tr>
            `;
          },
          footerFormat: '</table>',
          shared: true,
          margin: 10,
        },
        chart: {
          type: chartType,
          zoomType: 'y',
          backgroundColor: '#11244a',
          style: {
            fontFamily: 'Montserrat',
          },
        },
        credits: false,
        exporting: {
          enabled: false,
          sourceWidth: 1200,
          sourceHeight: 800,
        },
        getTable() {
          let output = `<table data-is-styled="true" role="table"><thead><tr><th>Category</th>`;
          this.series.forEach(serie => {
            output += `<th>${serie.name}</th>`;
          });
          output += `</tr></thead><tbody>`;

          const categories = this.xAxis.categories ? this.xAxis.categories : this.xAxis[0].categories;

          const isPercentage = this.plotOptions?.custom?.isPercentage;

          // Series are columns, categories are rows
          categories.forEach((category, rowIndex) => {
            output += `<tr>`;
            output += `<th scope="row">${category}</th>`
            this.series.forEach(series => {
              output += `<td>${ series.data?.[rowIndex]?.toLocaleString() }${ isPercentage ? '%' : '' }</td>`;
            });
            output += `</tr>`
          });

          output += `</tbody></table>`;
          return output;
        }
      }
    );
  }
}
const H = Highcharts;
