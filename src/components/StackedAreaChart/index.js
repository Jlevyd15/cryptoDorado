import React from 'react'
import { Bar, Line } from 'react-chartjs-2';
import { Dropdown, DropdownMenu, DropdownItem, Progress } from 'reactstrap';
import CardContainer from '../Card/CardContainer';
import ReactHighcharts from 'react-highcharts';

import * as styles from './style.css'

import { db, auth } from '../../firebase';

import config from '../../utils/projectConfig';

class StackedAreaChart extends React.Component {
	constructor(props) {
		super();
		this.toggleChatData = this.toggleChatData.bind(this)
		this.getCoinData = this.getCoinData.bind(this)
		this.getChartData = this.getChartData.bind(this)
		this.mapCoinTypeName = this.mapCoinTypeName.bind(this)
		this.mapCoinTypeColor = this.mapCoinTypeColor.bind(this)
		this.state = {
			walletData: '',
		}
	}

	// componentWillMount() {
	// 	// if the card is hidden the toggle call toggleChatData
	// 	auth.onAuthStateChanged(user => {
	// 		// console.log('user', user.uid)
	// 	  	if (user) {
	// 			// console.log('user id', user.uid)
	// 		    db.ref().child('users/' + user.uid)
	// 		    	.child('walletData')
	// 		    	.on('value', snap => {
	// 		    		console.log(snap.val())
	// 		    		if (snap.val()) {
	// 		    			this.setState({ walletData: snap.val() })
	// 		    		}
	// 		    	})
	// 		} else {
	// 			return false
	// 		}
	// 	});
	// }

	toggleChatData(coinType) {
		console.log('toggling coin ', coinType)
		//based on the coinType given, find the position of that coin in the array of walletData
		//we need to do this because the highchat api will toggle chart data based on the position of the object in the data array
		const { walletData } = this.props;
		let coinIndex = '';
		let index = 0;
		for (const key in walletData) {
			if(walletData[key].type === coinType) {
				coinIndex = index;
			}
			index++;
		}

		let chart = this.refs.chart.getChart();
		var series = chart.series[coinIndex];
		console.log('series', series)
		if(series) {
		    if (series.visible) {
				console.log('if case ', series.visible)
		        series.hide();
		    } else {
				console.log('else case ', series)
		        series.show();
		    }
		}
	}

	// the walletData has type: 'BTC', this will map that to the display name
	mapCoinTypeName(coinType) {
		switch(coinType) {
  			case 'ETH':
  				return 'Ethereum'
			case 'BTC':
  				return 'Bitcoin'
			case 'LTC':
  				return 'Litecoin'
			default:
				return 'Other'
  		}
	}

	//based on the coins in the walletData set the chart color accordingly 
	mapCoinTypeColor() {
		const { walletData } = this.props;
		const chartColorArray = [];
		for (const key in walletData) {
			switch(walletData[key].type) {
	  			case 'ETH':
	  				chartColorArray.push('#20a8d8');
				case 'BTC':
	  				chartColorArray.push('#f86c6b');
				case 'LTC':
	  				chartColorArray.push('#f8cb00');
				default:
	  				chartColorArray.push('#f8cb00');
	  		}
	  	}
  		return chartColorArray;
	}

	getCoinData() {
		const { walletData } = this.props;
		const seriesData = []

		//iterate over the coins in the walletData and push each into the chart data object
		for (const key in walletData) {
			seriesData.push({
				name: this.mapCoinTypeName(walletData[key].type),
				data: walletData[key].data
			});

			// check if the data series is hidden
			if (walletData[key].hidden) {
				console.log('hidding coin', walletData[key].type);
				this.toggleChatData(walletData[key].type);
			}
		}
		return seriesData;
	}

	getChartData() {
		console.log('get chart data')
		return {
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
		    colors: this.mapCoinTypeColor(),
		    series: this.getCoinData()
		    // color: ['white', 'grey', 'blue'],
		    // series: [{name: 'E', data: [1, 2, 3]}, {name: 'B', data: [4, 5, 6]}, {name: 'L', data: [7, 8, 9]}]
		}
	}

	render() {
		// const data = {
		//     chart: {
		//         type: 'area'
		//     },
		//     title: {
		//         text: 'Total Crypto Holdings'
		//     },
		//     subtitle: {
		//         // text: 'Source: Wikipedia.org'
		//     },
		//     xAxis: {
		//         categories: ['2011', '2012', '2013', '2014', '2015', '2016', '2017'],
		//         tickmarkPlacement: 'on',
		//         title: {
		//             enabled: false
		//         }
		//     },
		//     yAxis: {
		//         title: {
		//             text: 'Dollars (USD)'
		//         },
		//         labels: {
		//             formatter: function () {
		//                 return this.value / 1;
		//             }
		//         }
		//     },
		//     tooltip: {
		//         split: true,
		//         valueSuffix: ' dollars'
		//     },
		//     plotOptions: {
		//         area: {
		//             stacking: 'normal',
		//             lineColor: '#666666',
		//             lineWidth: 1,
		//             marker: {
		//                 lineWidth: 1,
		//                 lineColor: '#666666'
		//             }
		//         }
		//     },
		//     // colors: this.mapCoinTypeColor(),
		//     // series: this.getCoinData()
		//     color: ['white', 'grey', 'blue'],
		//     series: [{name: 'E', data: [1, 2, 3]}, {name: 'B', data: [4, 5, 6]}, {name: 'L', data: [7, 8, 9]}]
		// }
		return (
			<div>
				{/*<div className="card">*/}
	          	<div className="stacked-chart" >
	    			<ReactHighcharts  config={this.getChartData()} ref="chart" isPureConfig={true} />
    			</div>
		       	{/*</div>*/}
		       	<div className="container-fluid">
		        	<CardContainer walletData={this.state.walletData} modalId={config.ids.modals.confirm} toggleChartData={this.toggleChatData} />
		        </div>
	        </div>
		)
	}
}


export default StackedAreaChart