export default class SankeyClass {
  static config() {
    const test = {
      chart: {
        // type: 'sankeyChart',
        // zoomType: 'xy',
        backgroundColor: '#0A254E',
        height: '100%',
        style: {
          fontFamily: 'Montserrat',
        },
        events: { load: () => {  } },
      },
      title: {
        text: '',
      },
      // plotOptions: {
      //   series: {
      //     color: '#f0f',
      //   },
      // },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            color: '#fff',
            style: {
              // textOutline: 'none',
            },
            // backgroundColor: '#00ff00',
          },
        },
      },
      series: [{
        data: [
          {
            from: 'Program Adam', to: 'Program Kate', weight: 885, name: 'ab', className: 'STUPID',
          },
          {
            from: 'Program Allison', to: 'Program Kate', weight: 205, name: 'abc', className: 'STUPID',
          },
          {
            from: 'Program Kate', to: 'Program Adam2', weight: 25, name: 'abcd', className: 'STUPID',
          },
        ],
        type: 'sankey',
        colors: window.App.pages.colors,
        name: 'Sankey demo series',
      }],
      exporting: {
        enabled: false,
        sourceWidth: 1200,
        sourceHeight: 800,
      },
      credits: false,
    };

    return (test);
  }
}
