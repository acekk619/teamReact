import Highcharts from 'react-highcharts';
import React from 'react';

export default class MyGraph extends React.Component {

    render() {
        const config = {
            "chart": {
                "plotBackgroundColor": null,
                "lotBorderWidth": null,
                "plotShadow": false,
                "type": "pie"
            },
            "title": {
                "text": "費目別割合" // グラフのタイトル
            },
            "tooltip": {
                "pointFormat": '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Microsoft Internet Explorer',
                    y: 56.33
                }, {
                    name: 'Chrome',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Firefox',
                    y: 10.38
                }, {
                    name: 'Safari',
                    y: 4.77
                }, {
                    name: 'Opera',
                    y: 0.91
                }, {
                    name: 'Proprietary or Undetectable',
                    y: 0.2
                }]
            }]
        };
        return (
            <Highcharts config={config} ref="chart"></Highcharts>
        );
    }

}