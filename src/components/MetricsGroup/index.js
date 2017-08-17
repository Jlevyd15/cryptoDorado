import React from 'react';

import { calcXIRR } from '../../utils/returnCalc';
import { fills } from '../../utils/fills_LTC';


const MetricsGroup = () => {

	// const data = [
	// 	{
	// 		"price": 5000,
	// 		"created_at": "2014-11-07T22:19:28.578544Z",
	// 		"size": "-1"
	// 	},
	// 	{
	// 		"price": 1000,
	// 		"created_at": "2014-11-07T22:19:28.578544Z",
	// 		"size": 1
	// 	},
	// 	{
	// 		"price": 2000,
	// 		"created_at": "2014-11-07T22:19:28.578544Z",
	// 		"size": 1
	// 	},
	// 	{
	// 		"price": 2500,
	// 		"created_at": "2014-11-07T22:19:28.578544Z",
	// 		"size": 1
	// 	},
	// 	{
	// 		"price": 1000,
	// 		"created_at": "2014-11-07T22:19:28.578544Z",
	// 		"size": 1
	// 	},
	// ];
	const guess = 1.309190881;
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-lg-4">
					<div className="card card-outline-primary text-center">
						<div class="card-block">
							<div className="col-xs-6"><h4>Total Crypto Value</h4></div>
							<div className="col-xs-6"><h5>$20,245</h5></div>
						</div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="card card-outline-primary text-center">
						<div class="card-block">
							<div className="col-xs-6"><h4>Gain/Loss</h4></div>
							<div className="col-xs-6"><h5>$1,575</h5></div>
						</div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="card card-outline-primary text-center">
						<div class="card-block">
							<div className="col-xs-6"><h4>Return</h4></div>
							<div className="col-xs-6"><h5>{calcXIRR(fills, guess)}</h5></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MetricsGroup