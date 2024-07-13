import Highcharts from 'highcharts';

const titleNode = ({ text }) => ({
  text,
  style: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
  },
});

export default class ScatterChart {
  static config({
    chart,
    chartSeries,
  }) {
    const {
      yAxisTitle,
      decimalPoints,
      isYear
    } = chart.chart_config;

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

    const series = {
      groupPadding: 0.05,
      pointWidth: undefined,
      stacking: 'normal',
      pointPadding: .1
    }

    let yAxis = {
      title: titleNode({ text: yAxisTitle }),
      gridLineColor: 'rgba(49, 148, 224, 0.25)',
      labels: labelsNode,
    };

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
          categories: [],
          labels: labelsNode,
          tickInterval: chart.chart_config.xAxisTickInterval
        },
        yAxis,
        series: chartSeries,
        colors: getColors(),
        min: 0,
        plotOptions: {
          series
        },
        legend: {
          forceShow: !chart.hide_interactive_legend,
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
        tooltip: {
          enabled: !chart.hide_tooltips,
          backgroundColor: '#031837',
          borderWidth: 0,
          style: {
            color: '#031837',
            fontWeight: 'bold',
            fontFamily: "'Public Sans', 'Lato', sans-serif",
            fontSize: '13px'
          },
          useHTML: true,
          headerFormat: `
            <div style="width: calc(100% + 14px); margin-top: -7px; margin-left: -7px; border-top: 6px solid #90C1D6"></div>
            <h5 style="color: #90C1D6;text-align: center;padding: 10px 10px 0; font-size: 15px">{point.series.name}</h5>
            <table style="width: 100%; padding: 0 10px 10px">
          `,
          pointFormatter() {
            let xy = [this.x, this.y].map(number => {
              number = parseFloat(Number(number.toFixed(decimalPoints)));
              if (Number.isInteger(number)) {
                number = number.toLocaleString() + decimals;
              } else {
                number = number.toFixed(decimalPoints).toLocaleString();
              }
              return number
            });

            let body = `
              <tr>
                <td style="display: flex; justify-content: space-between; font-size: 13px;">
                  <span style="margin-right: 20px; max-width: 65%; color: #C9EEFE">${this.series.xAxis.options.title.text ? this.series.xAxis.options.title.text : "X axis"}:</span>
                  <span style="text-align: right; color: #C9EEFE"><b>${xy[0]}</b></span>
                </td>
              </tr>
              <tr>
                <td style="display: flex; justify-content: space-between; font-size: 13px;">
                  <span style="margin-right: 20px; max-width: 65%; color: #C9EEFE">${this.series.yAxis.options.title.text ? this.series.yAxis.options.title.text : "Y axis"}:</span>
                  <span style="text-align: right; color: #C9EEFE"><b>${xy[1]}</b></span>
                </td>
              </tr>
            `;

            // Show extra info, e.g. agency
            // Data beyond first 2 indices is only available in parent series object
            let fullData = this.series.userOptions.data[this.index]

            for (let i = 2; i < fullData.length; i++) {
              if (fullData[i]) {
                body += `
                  <tr>
                    <td style="display: flex; justify-content: space-between; font-size: 13px;">
                      <span style="margin: auto; width: 100%; color: #C9EEFE; text-align: center">${fullData[i]}</span>
                    </td>
                  </tr>
                `
              }
            }

            return body
          },
          footerFormat: '</table>',
          shared: true,
          margin: 10,
        },
        chart: {
          type: 'scatter',
          zoomType: 'xy',
          backgroundColor: '#0A254E',
          style: {
            fontFamily: "'Public Sans', 'Lato', sans-serif",
          },
        },
        credits: false,
        exporting: {
          enabled: false,
          sourceWidth: 1200,
          sourceHeight: 800,
        },
        getTable() {
          let longestIndex = 0
          this.series.forEach(series => {
            series.data.forEach(point => {
              if (point.length > longestIndex)
                longestIndex = point.length
            })
          })

          let output = `<table data-is-styled="true" role="table"><thead><tr><th scope="col">Category</th><th scope="col">${this.xAxis[0].title.text ? this.xAxis[0].title.text : "X axis"}</th><th scope="col">${this.yAxis[0].title.text ? this.yAxis[0].title.text : "Y axis"}</th>`;
          for (let i = 2; i < longestIndex; i++) {
            output += `<th scope="col">Additional info ${i - 1}</th>`;
          }
          output += `</tr></thead><tbody>`;

          this.series.forEach(series => {
            let rowCategory = series.name

            series.data.forEach(point => {
              output += `<tr><td>${rowCategory}</td><td>${point[0]}</td><td>${point[1]}</td>`
              for (let i = 2; i < longestIndex; i++) {
                output += `<td>${point[i] ? point[i] : '—'}</td>`;
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