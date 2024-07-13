import Highcharts from 'highcharts';
import { flatten } from 'lodash';

const titleNode = ({ text }) => ({
  text,
  style: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
  },
});

export default class Boxplot {
  static config({
    chart,
    categories,
    chartSeries
  }) {
    const {
      yAxisTitle,
      isYear,
      colorByCategory
    } = chart.chart_config;

    // Convert each series' outliers to a separate scatter series
    chartSeries.forEach((data, i) => {
      if (data.outliers) {
        chartSeries.push({
          name: data.series_name,
          type: 'scatter',
          linkedTo: `series_${i}`,
          // Convert from [ [...y values] ] to X-Y coordinates
          // (outliers are ordered by boxplots, so they're also ordered by category)
          // (filter necessary because some boxplots may have no outliers)
          data: flatten(
            data.outliers.map((outliers, boxplotIndex) =>
              outliers.map(yValue => [boxplotIndex, yValue])
            ).filter(pair => pair.length > 0)
          )
        })
      }
    });

    const outliers = chartSeries.filter(data => data.type !== 'scatter').map(data => data.outliers).filter(Boolean)

    const labelsNode = {
      style: {
        color: '#3194E0',
        fontSize: '13px',
        fontFamily: "'Public Sans', 'Lato', sans-serif"
      },
      formatter: function () {
        return isYear ? this.value : this.value.toLocaleString();
      }
    };

    let yAxis = {
      title: titleNode({ text: yAxisTitle }),
      gridLineColor: 'rgba(49, 148, 224, 0.25)',
      labels: labelsNode,
    };

    const fillColors = ['#99DDFF', '#44BB99', '#BBCC33', '#CF66EE'];
    const strokeColors = ['#66abcc', '#008a6b', '#879b00', '#9b34bb'];

    const hasMultipleSeries = chartSeries.filter(series => series.type == 'boxplot').length > 1;

    return (
      {
        title: {
          text: '',
          wdpTitle: chart.chart_config.title,
          wdpShortTitle: chart.chart_config.shortTitle
        },
        accessibility: {},
        chartDescription: chart.chart_config.description,
        xAxis: {
          title: {
            style: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '14px',
              fontFamily: "'Public Sans', 'Lato', sans-serif"
            },
            margin: 25,
            text: chart.chart_config.xAxisTitle
          },
          lineColor: '#3194E0',
          lineWidth: 2,
          tickWidth: 0,
          categories,
          labels: labelsNode,
        },
        yAxis,
        series: chartSeries,
        colors: fillColors,
        min: 0,
        plotOptions: {
          series: {
            groupPadding: 0.05,
            pointWidth: undefined,
            stacking: undefined, // Appears to break the scatter positioning of outliers
            pointPadding: .1,
            custom: {
              outliers
            }
          }
        },
        legend: {
          enabled: hasMultipleSeries,
          forceShow: hasMultipleSeries,
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
              fontFamily: "'Public Sans', 'Lato', sans-serif"
            },
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#031837',
          borderWidth: 0,
          style: {
            color: '#031837',
            fontWeight: 'bold',
            fontSize: '13px',
            fontFamily: "'Public Sans', 'Lato', sans-serif"
          },
          useHTML: true,
          headerFormat: `
            <div style="width: calc(100% + 14px); margin-top: -7px; margin-left: -7px; border-top: 6px solid #90C1D6; font-family: 'Public Sans', 'Lato', sans-serif;"></div>
            <h5 style="color: #90C1D6;text-align: center;padding: 10px 10px 0"; font-size: 15px>{point.key}</h5>
            <h5 style="color: #90C1D6;text-align: center;padding: 0px 10px 10px; font-size: 15px">{point.series.name}</h5>
            <table style="width: 100%; padding: 0 10px 10px">
          `,
          pointFormatter() {
            const isOutlier = this.series.options.type == 'scatter'

            if (!isOutlier) {
              let vals = Object.values(this.options); // The 5 boxplot values, in reverse order

              return ['Maximum', 'Upper quartile', 'Median', 'Lower quartile', 'Minimum'].map((key, i) => `
                <tr>
                  <td style="display: flex; justify-content: space-between; font-size: 13px">
                    <span style="margin-right: 20px; max-width: 65%; color: #C9EEFE">${key}:</span>
                    <span style="text-align: right; color: #C9EEFE"><b>${vals[4 - i]}</b></span>
                  </td>
                </tr>
              `).join('')
            } else {
              return `
                <tr>
                  <td style="display: flex; justify-content: space-between; font-size: 13px">
                    <span style="margin-right: 20px; max-width: 65%; color: #C9EEFE">Outlier value:</span>
                    <span style="text-align: right; color: #C9EEFE"><b>${this.options.y}</b></span>
                  </td>
                </tr>
              `
            }
          },
          footerFormat: '</table>',
        },
        chart: {
          type: 'boxplot',
          zoomType: 'xy',
          backgroundColor: '#0A254E',
          style: {
            fontFamily: "'Public Sans', 'Lato', sans-serif",
          },
          events: {
            load: function(){
              this.series.forEach((series, seriesIndex) => {
                let colorIndex = null;

                if (!colorByCategory) {
                  // Color by series
                  if (series.linkedParent) {
                    // This is an outlier; inherit color from parent boxplot
                    colorIndex = series.linkedParent.colorIndex;
                  } else {
                    colorIndex = seriesIndex;
                  }
                }

                Highcharts.each(series.points, (point, pointIndex) => {
                  if (colorByCategory) {
                    let categoryIndex = null;

                    if (series.options.type === 'boxplot') {
                      // Point index = category index, because there is one boxplot per series per category
                      categoryIndex = pointIndex;
                    } else {
                      // This is an outlier; X value corresponds to category index
                      categoryIndex = point.x;
                    }

                    colorIndex = categoryIndex;
                  }

                  const fillColor = fillColors[ colorIndex % fillColors.length ];
                  const color = strokeColors[ colorIndex % strokeColors.length ];

                  point.update({ fillColor, color }, false)
                });
              });

              this.redraw();
            }
          },
        },
        credits: false,
        exporting: {
          enabled: false,
          sourceWidth: 1200,
          sourceHeight: 800,
        },
        getTable() {
          let output = `<table role="table" data-is-styled="true"><thead><tr>`

          const showSeriesNames = this.series.some(s => s.name && s.name != 'Outliers')
          if (showSeriesNames) output += `<th>Category</th>`
          
          output += `<th scope="col">${this.xAxis[0].title.text ? this.xAxis[0].title.text : "X axis"}</th><th scope="col">Minimum</th><th scope="col">Q1</th><th scope="col">Median</th><th scope="col">Q3</th><th scope="col">Maximum</th>`;
          
          const outliers = this.plotOptions?.series?.custom?.outliers;
          if (outliers && outliers.length > 0) output += `<th>Outliers</th>`

          output += `</tr></thead><tbody>`;

          this.series.forEach((series, seriesIndex) => {
            if (series.type == 'scatter') return; // Don't show outliers as separate series

            series.data.forEach((point, boxplotIndex) => {
              output += `<tr>`

              if (showSeriesNames) {
                output += `<th scope="row">${series.name ? series.name : '—'}</th>`;
              }

              output += `<th scope="row">${this.xAxis[0].categories[boxplotIndex] ? this.xAxis[0].categories[boxplotIndex] : boxplotIndex}</th>`;
              output += `<td>${point.low}</td><td>${point.q1}</td><td>${point.median}</td><td>${point.q3}</td><td>${point.high}</td>`;

              if (outliers && outliers.length > 0) {
                const boxplotHasOutliers = (outliers[seriesIndex] && outliers[seriesIndex][boxplotIndex] && outliers[seriesIndex][boxplotIndex].length > 0)
                output += `<td>${boxplotHasOutliers ? outliers[seriesIndex][boxplotIndex].join(', ') : '—'}</td>`
              }

              output += `</tr>`
            })
          })

          output += `</tbody></table>`

          return output
        }
      }
    );
  }
}

const H = Highcharts;