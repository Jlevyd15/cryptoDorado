import React from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import { coinIcons } from './coinIcons';

import * as styles from './style.css'

class Card extends React.Component {
	constructor(props) {
		super();
		this.state = {
			dropdownState: false,
		}
	}
	render() {
	const cardColorMap = {
		red: 'card-danger',
		yellow: 'card-warning',
		blue: 'card-info',
		primary: 'card-primary',
		disabled: 'card-disabled'
	}
	const { color, fiatAmount, coinAmount, coinType, displayName, address, addCardStyle, addCard, 
		removeCard, cardId, toggleCoinCard, dropdownId, cardDisabled } = this.props
	const { dropdownState } = this.state

		return (
		  	<div className="col-sm-6 col-lg-3">
				{!addCardStyle ?
					<div className={`card card-inverse ${cardColorMap[color] || cardColorMap['primary']}`}>
					<span className="coin-icon" dangerouslySetInnerHTML={{__html: coinIcons[coinType]}}></span>
					  <div className="card-block pb-0">
						{ cardDisabled ? <span className="badge badge-danger float-right">Hidden</span> : '' }
						<br />
						<div className="btn-group float-right">
							<Dropdown isOpen={dropdownState} toggle={() => { this.setState({ dropdownState: !dropdownState }); }}>
			                    <button onClick={() => { this.setState({ dropdownState: !dropdownState }); }} className="btn btn-transparent active dropdown-toggle p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded={dropdownState}>
			                      <i className="icon-settings"></i>
			                    </button>
			                    <DropdownMenu className="dropdown-menu-right">
			                      <DropdownItem onClick={() => toggleCoinCard(cardId, cardDisabled, coinType)}>toggle coin</DropdownItem>
			                    </DropdownMenu>
			                  </Dropdown>
							{/*<button className="btn btn-transparent active p-0" onClick={() => removeCard(cardId)}>
								<i className="fa fa-trash-o fa-lg"></i>
							</button>*/}
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
						<button className="btn btn-transparent active p-0" onClick={() => alert('add coin')}>
						  <i className="fa fa-plus-square-o fa-lg mt-4"></i>
						  <p>add coin</p>
						</button>
					</div>
				}
			</div>
		)
	}
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
	dropdownState: React.PropTypes.bool,
	toggleCoinCard: React.PropTypes.func,
	dropdownId: React.PropTypes.string
}

export default Card