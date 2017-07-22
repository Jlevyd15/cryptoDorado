import React from 'react';

const Card = ({ color, fiatAmount, coinAmount, coinType, displayName, address, addCardStyle, addCard, removeCard, cardId }) => {
	const cardColorMap = {
		red: 'card-danger',
		yellow: 'card-warning',
		blue: 'card-info',
		primary: 'card-primary'
	}

	return (

	  	<div className="col-sm-6 col-lg-3">
			{!addCardStyle ? 
				<div className={`card card-inverse ${cardColorMap[color] || cardColorMap['primary']}`}>
				  <div className="card-block pb-0">
					<div className="btn-group float-right">
						<button className="btn btn-transparent active p-0" onClick={() => removeCard(cardId)}>
							<i className="fa fa-trash-o fa-lg"></i>
						</button>
					</div>
					<h4 className="mb-0">${fiatAmount}</h4>
					<div className="d-flex align-items-baseline">
						<h4 className="mb-0">{coinAmount}</h4>
						<small>&nbsp;{coinType}</small>
					</div>
					<p>{displayName}</p>
					<div id={address} className="d-none" />
				  </div>
				</div>
				:
				<div className={`card card-inverse ${cardColorMap[color] || cardColorMap['primary']}`}>
					<button className="btn btn-transparent active p-0" onClick={() => addCard()}>
					  <i className="fa fa-plus-square-o fa-lg mt-4"></i>
					  <p>add wallet</p>
					</button>
				</div>
			}
		</div>
	)
}

Card.propTypes = {
	cardId: React.PropTypes.string,
	color: React.PropTypes.string,
	fiatAmount: React.PropTypes.number,
	coinAmount: React.PropTypes.number,
	coinType: React.PropTypes.string,
	displayName: React.PropTypes.string,
	address: React.PropTypes.string,
	addCardStyle: React.PropTypes.string,
	addCard: React.PropTypes.func,
	removeCard: React.PropTypes.func,
}

export default Card;