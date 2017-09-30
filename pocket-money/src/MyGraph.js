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
                    name: 'お菓子',
                    y: 10
                }, {
                    name: '文具',
                    y: 14
                }, {
                    name: '本',
                    y: 60
                }, {
                    name: '雑貨',
                    y: 16
                }]
            }]
        };
        return (
            <Highcharts config={config} ref="chart"></Highcharts>
        );
    }

}