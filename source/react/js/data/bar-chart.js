module.exports = {
  title: {
    text: '',
  },
  xAxis: {
    lineColor: '#3194E0',
    lineWidth: 2,
    tickWidth: 0,
    categories: ['2016', '2015', '2014', '2013'],
    labels: {
      // padding: 20,
      style: {
        color: '#3194E0',
        fontSize: '12px',
      },
    },
  },
  yAxis: {
    // endOnTick: true,
    showFirstLabel: false,
    // startOnTick: true,
    title: {
      text: 'Clients Served',
      margin: 20,
      // y: 20,
      style: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '14px',
        // marginBottom: '50px',
        // marginBottom: 50,
      },
    },
    gridLineColor: 'rgba(49, 148, 224, 0.25)',
    // labels: {
    //   enabled: false,
    // },
    max: 10000,
    // tickInterval: 4000,
    labels: {
      style: {
        color: '#3194E0',
        fontSize: '12px',
      },
      // formatter() {
      //   const label = this.axis.defaultLabelFormatter.call(this);
      //   return `+${label}`;
      // },
    },
  },
  series: [
    {
      name: 'Men',
      color: '#006333',
      data: [7070, 3100, 6350, 4216],
    }, {
      name: 'Women',
      color: '#FFD029',
      data: [9330, 7560, 9470, 6001],
    },
  ],
};
