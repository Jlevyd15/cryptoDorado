import React from 'react';
import { connect } from 'react-redux';
import { db, auth, setUserData, updateUserData, removeUserData, isUserLoggedIn, getLoggedInUserRef } from '../../firebase';

//utils
import config from '../../utils/projectConfig';
import constants from '../../utils/constants'

//actions
import { modal, card } from '../../actions';

//components
import Card from './'
import ModalGroup from '../ModalGroup'


class CardContainer extends React.Component { 
	constructor(props) {
		super();

		this.getCardColor = this.getCardColor.bind(this);
		this.getFiatAmount = this.getFiatAmount.bind(this);
		this.handleAddCard = this.handleAddCard.bind(this);
    	this.handleRemoveCard = this.handleRemoveCard.bind(this);
    	// this.confirmRemoveCallback = this.confirmRemoveCallback.bind(this);
    	this.handleToggleCoinCard = this.handleToggleCoinCard.bind(this);
    	this.getCardId = this.getCardId.bind(this);
    	this.isCardDisabled = this.isCardDisabled.bind(this);
		this.state = {
			walletData: '',
			dropdownState: false,
		}
	}

	componentWillMount() {
    // *** get the list of wallets the user has and display them in cards ***
	    // if (getLoggedInUserRef()) {
	    //     getLoggedInUserRef().child('walletData').on('value', snap => {
	    //     console.log('walletData value ', snap.val())
	    //     if (snap.val()) {
	    //       this.setState({ walletData: snap.val() })
	    //     }
	    //   })
	    // } else {
	    // 	console.log('not logged in')
	    // }
	    auth.onAuthStateChanged(user => {
			// console.log('user', user.uid)
		  	if (user) {
				// console.log('user id', user.uid)
			    db.ref().child('users/' + user.uid)
			    	.child('walletData')
			    	.on('value', snap => {
			    		// console.log(snap.val())
			    		if (snap.val()) {
			    			this.setState({ walletData: snap.val() })
			    		}
			    	})
			} else {
				return false
			}
		});
	    
    }

  	handleAddCard() {
	    console.log('in write data')
	    if (isUserLoggedIn) {
	      updateUserData("walletData", { address: '123xyz', type: constants.coinTypes.BTC, displayName: 'test123' }, true)
	    }
  	}

  	handleRemoveCard(id) {
	    console.log('in write data')
	  	// this.confirmRemoveCallback(id)
	  	this.props.openModal(this.props.modalId, { id })
	}

	// handleHideCoinCard(id) {
	//     console.log('in write data')
	//   	// this.confirmRemoveCallback(id)
	//   	updateUserData("walletData", { address: '123xyz', type: constants.coinTypes.BTC, displayName: 'test123' }, true)
	// }

	handleToggleCoinCard(id, cardDisabled, coinType) {	
  		// this.setState({ dropdownState: !this.state.dropdownState })
  		// this.props.openModal(id)
  		console.log('in toggle coin card', id, cardDisabled)
  		this.props.toggleChartData(coinType)
  		// call an action dispatcher to set the state of hidden in redux
  		// this.setState({ cardDisabled: !this.state.cardDisabled })
  		this.props.toggleCard(this.getCardId(coinType))
  		// this.getCardColor(null, this.isCardDisabled(coinType))
  		// updateUserData(`walletData/${id}/hidden`, !cardDisabled)
  	}



  	getCardColor(type, cardHidden) {
  		console.log('cardHidden', cardHidden)
  		if (cardHidden === true) {
  			return 'disabled'
  		}
  		switch(type) {
  			case 'ETH':
  				return 'primary'
			case 'BTC':
				return 'red'
			case 'LTC':
				return 'yellow'
  		}
  	}

  	getFiatAmount() {
  		console.log('test');
  	}

  	// confirmRemoveCallback(data) {
  	// 	const { id } = data
  	// 	if (isUserLoggedIn) {
	  //     removeUserData("/walletData/" + id)
	  //     this.props.closeModal(this.props.modalId)
	  //   }
  	// }

  	getCardId(coinType) {
  		switch(coinType) {
  			case 'ETH':
  				return config.ids.cards.ETH
			case 'BTC':
  				return config.ids.cards.BTC
			case 'LTC':
  				return config.ids.cards.LTC
			default:
				return null	
  		}
  	}

  	isCardDisabled(coinType) {
  		return this.props.cards.getIn([this.getCardId(coinType), 'hidden'])
  	}

	render() {
		
		const renderCardList = () => {
			const { walletData } = this.state
			const renderedList = []
	  		for (const key in walletData) {
	  			// console.log(walletData[key])
				renderedList.push(
					<Card 
						key={key}
						color={this.getCardColor(walletData[key].type, this.isCardDisabled(walletData[key].type))}
						fiatAmount={1000}
						coinAmount={10}
						coinType={walletData[key].type}
						displayName={walletData[key].displayName}
						address={walletData[key].address}
						removeCard={this.handleRemoveCard}
						cardId={key}
						toggleCoinCard={this.handleToggleCoinCard}
						// dropdownId={this.getDropdownId(walletData[key].type)}
						// cardDisabled={walletData[key].hidden}
						cardDisabled={this.isCardDisabled(walletData[key].type)}
					/>
				)
			}
			return renderedList.map(card => card)
	  	}

		return (	
			<div className="row">
				{renderCardList()}
				<Card addCardStyle={true} color={'blue'} addCard={this.handleAddCard} />
				<ModalGroup 
		          id={this.props.modalId}
		          // bodyContent={confirmRemoveMessage}
		          // primaryBtnCallback={this.confirmRemoveCallback}
		          headerContent={config.messages.setupModalHeader}
		          primaryBtnContent="Yes"
		          secondayBtnContent="Cancel"
		        />
			</div>
		)
	}
}

const mapStateToProps = (state, props) => ({
	cards: state.cards
})

const mapDispatchToProps = (dispatch, ownProps) => {
// console.log('ownProps', ownProps)
return ({
  openModal: (modalId, data) => dispatch(modal.open(modalId, true, data)),
  closeModal: modalId => dispatch(modal.close(modalId, false)),
  toggleCard: id => dispatch(card.toggle(id))
})}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);