import React from 'react'
import { Bar, Line } from 'react-chartjs-2';
import { Dropdown, DropdownMenu, DropdownItem, Progress } from 'reactstrap';
import ReactHighcharts from 'react-highcharts';


class StackedAreaChart extends React.Component {
	constructor(props) {
		super();
		this.toggleChatData = this.toggleChatData.bind(this)
	}

	componentDidMount() {
		
	}

	toggleChatData(dataSeriesIndex) {
		let chart = this.refs.chart.getChart();
		var series = chart.series[0];	
	    if (series.visible) {
	        series.hide();
	    } else {
	        series.show();
	    }
	}

	render() {
		const config = {
		    chart: {
		        type: 'area'
		    },
		    title: {
		        text: 'Total Crypto Holdings'
		    },
		    subtitle: {
		        // text: 'Source: Wikipedia.org'
		    },
		    xAxis: {
		        categories: ['2011', '2012', '2013', '2014', '2015', '2016', '2017'],
		        tickmarkPlacement: 'on',
		        title: {
		            enabled: false
		        }
		    },
		    yAxis: {
		        title: {
		            text: 'Dollars (USD)'
		        },
		        labels: {
		            formatter: function () {
		                return this.value / 1;
		            }
		        }
		    },
		    tooltip: {
		        split: true,
		        valueSuffix: ' dollars'
		    },
		    plotOptions: {
		        area: {
		            stacking: 'normal',
		            lineColor: '#666666',
		            lineWidth: 1,
		            marker: {
		                lineWidth: 1,
		                lineColor: '#666666'
		            }
		        }
		    },
		    colors: ['#f86c6b', '#f8cb00', '#20a8d8'],
		    series: [{
		        name: 'Bitcoin',
		        data: [502, 635, 809, 947, 1402, 3634, 5268]
		    }, {
		        name: 'Litecoin',
		        data: [106, 107, 111, 133, 221, 767, 1766]
		    }, {
		        name: 'Ethereum',
		        data: [163, 203, 276, 408, 547, 729, 628]
		    }]
		}

		return (
	        <div className="card">
	          <div className="card-block">
	    		<ReactHighcharts config={config} ref="chart" />
	          </div>
	        </div>
		)
	}
}


export default StackedAreaChart