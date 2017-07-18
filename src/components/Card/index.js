import React from 'react';

const Card = ({ color }) => {
	const cardColorMap = {
		red: 'card-danger',
		yellow: 'card-warning',
		blue: 'card-info',
		primary: 'card-primary'
	}

	return (
	  	<div className="col-sm-6 col-lg-3">
			<div className={`card card-inverse ${cardColorMap[color] || cardColorMap['primary']}`}>
			  <div className="card-block pb-0">
				{/*<div className="btn-group float-right">
				  <Dropdown isOpen={this.state.card4} toggle={() => { this.setState({ card4: !this.state.card4 }); }}>
					<button onClick={() => { this.setState({ card4: !this.state.card4 }); }} className="btn btn-transparent active dropdown-toggle p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded={this.state.card4}>
					  <i className="icon-settings"></i>
					</button>
					<DropdownMenu>
					  <DropdownItem>Action</DropdownItem>
					  <DropdownItem>Another action</DropdownItem>
					  <DropdownItem>Something else here</DropdownItem>
					</DropdownMenu>
				  </Dropdown>
				</div>*/}
				<h4 className="mb-0">9.823</h4>
				<p>Members online</p>
			  </div>
			  {/*<div className="chart-wrapper px-3">
				<Bar data={cardChartData4} options={cardChartOpts4} height={70}/>
			  </div>*/}
			</div>
		</div>
	)
}

Card.propTypes = {
	color: React.PropTypes.string
}

export default Card;