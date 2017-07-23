import React from 'react'
import { Bar, Line } from 'react-chartjs-2';
import { Dropdown, DropdownMenu, DropdownItem, Progress } from 'reactstrap';


const StackedAreaChart = ({}) => {
	const brandPrimary =  '#20a8d8';
	const brandSuccess =  '#4dbd74';
	const brandInfo =     '#63c2de';
	const brandDanger =   '#f86c6b';
		// Main Chart

	// convert Hex to RGBA
	function convertHex(hex,opacity) {
	  hex = hex.replace('#','');
	  var r = parseInt(hex.substring(0,2), 16);
	  var g = parseInt(hex.substring(2,4), 16);
	  var b = parseInt(hex.substring(4,6), 16);

	  var result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
	  return result;
	}

	//Random Numbers
	function random(min,max) {
	  return Math.floor(Math.random()*(max-min+1)+min);
	}

	var elements = 27;
	var data1 = [];
	var data2 = [];
	var data3 = [];

	for (var i = 0; i <= elements; i++) {
	  data1.push(random(50,200));
	  data2.push(random(80,100));
	  data3.push(65);
	}

	const mainChart = {
	  labels: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,],
	  datasets: [
	    {
	      label: 'My First dataset',
	      backgroundColor: convertHex(brandInfo,10),
	      borderColor: brandInfo,
	      pointHoverBackgroundColor: '#fff',
	      borderWidth: 2,
	      data: data1
	    },
	    {
	      label: 'My Second dataset',
	      backgroundColor: 'transparent',
	      borderColor: brandSuccess,
	      pointHoverBackgroundColor: '#fff',
	      borderWidth: 2,
	      data: data2
	    },
	    {
	      label: 'My Third dataset',
	      backgroundColor: 'transparent',
	      borderColor: brandDanger,
	      pointHoverBackgroundColor: '#fff',
	      borderWidth: 1,
	      borderDash: [8, 5],
	      data: data3
	    }
	  ]
	}

	const mainChartOpts = {
	  maintainAspectRatio: false,
	  legend: {
	    display: false
	  },
	  scales: {
	    xAxes: [{
	      gridLines: {
	        drawOnChartArea: false,
	      }
	    }],
	    yAxes: [{
	      ticks: {
	        beginAtZero: true,
	        maxTicksLimit: 5,
	        stepSize: Math.ceil(250 / 5),
	        max: 250
	      }
	    }]
	  },
	  elements: {
	    point: {
	      radius: 0,
	      hitRadius: 10,
	      hoverRadius: 4,
	      hoverBorderWidth: 3,
	    }
	  }
	}
	return (
        <div className="card">
          <div className="card-block">
            <div className="row">
              <div className="col-sm-5">
                <h4 className="card-title mb-0">Traffic</h4>
                <div className="small text-muted">November 2015</div>
              </div>
              <div className="col-sm-7 hidden-sm-down">
                <button type="button" className="btn btn-primary float-right"><i className="icon-cloud-download"></i></button>
                <div className="btn-toolbar float-right" role="toolbar" aria-label="Toolbar with button groups">
                  <div className="btn-group mr-3" data-toggle="buttons" aria-label="First group">
                    <label className="btn btn-outline-secondary">
                      <input type="radio" name="options" id="option1"/> Day
                    </label>
                    <label className="btn btn-outline-secondary active">
                      <input type="radio" name="options" id="option2" defaultChecked/> Month
                    </label>
                    <label className="btn btn-outline-secondary">
                      <input type="radio" name="options" id="option3"/> Year
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
              <Line data={mainChart} options={mainChartOpts} height={300}/>
            </div>
          </div>
          <div className="card-footer">
            <ul>
              <li>
                <div className="text-muted">Visits</div>
                <strong>29.703 Users (40%)</strong>
                <Progress className="progress-xs mt-2" color="success" value="40" />
              </li>
              <li className="hidden-sm-down">
                <div className="text-muted">Unique</div>
                <strong>24.093 Users (20%)</strong>
                <Progress className="progress-xs mt-2" color="info" value="20" />
              </li>
              <li>
                <div className="text-muted">Pageviews</div>
                <strong>78.706 Views (60%)</strong>
                <Progress className="progress-xs mt-2" color="warning" value="60" />
              </li>
              <li className="hidden-sm-down">
                <div className="text-muted">New Users</div>
                <strong>22.123 Users (80%)</strong>
                <Progress className="progress-xs mt-2" color="danger" value="80" />
              </li>
              <li className="hidden-sm-down">
                <div className="text-muted">Bounce Rate</div>
                <strong>40.15%</strong>
                <Progress className="progress-xs mt-2" color="primary" value="40" />
              </li>
            </ul>
          </div>
        </div>
	)
}

export default StackedAreaChart