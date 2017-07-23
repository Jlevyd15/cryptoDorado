import React from 'react';
import { connect } from 'react-redux';
import { db, auth, writeUserData, removeUserData, isUserLoggedIn, getLoggedInUserRef } from '../../firebase';

//utils
import config from '../../utils/projectConfig';
import constants from '../../utils/constants'

//actions
import { modal } from '../../actions';

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
    	this.confirmRemoveCallback = this.confirmRemoveCallback.bind(this);
		this.state = {
			walletData: ''
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
			console.log('user', user.uid)
		  	if (user) {
				console.log('user id', user.uid)
			    db.ref().child('users/' + user.uid)
			    	.child('walletData')
			    	.on('value', snap => {
			    		console.log(snap.val())
			    		if (snap.val()) {
			    			this.setState({ walletData: snap.val() })
			    		}
			    	})
			} else {
				return false
			}
		});
	    
    }

    // shouldComponentUpdate() {
    // 	console.log('should update')
    // 	// if (getLoggedInUserRef()) {
	   //  //     getLoggedInUserRef().child('walletData').on('value', snap => {
	   //  //     console.log('walletData value ', snap.val())
	   //  //     if (snap.val()) {
	   //  //       this.setState({ walletData: snap.val() })
	   //  //     } else {
	   //  //     	// CardContainer.forceUpdate()
	   //  //     	console.log('no data force update')
	   //  //     }
	   //  //   })
	   //  // } else {
	   //  // 	console.log('not logged in')
	   //  // }
    // }

  	handleAddCard() {
	    console.log('in write data')
	    if (isUserLoggedIn) {
	      writeUserData("walletData", { address: '123xyz', type: constants.coinTypes.BTC, displayName: 'test123' }, true)
	    }
  	}

  	handleRemoveCard(id) {
	    console.log('in write data')
	  	// this.confirmRemoveCallback(id)
	  	this.props.openModal({ id })
	}

  	getCardColor(type) {
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
  		console.log('test')
  	}

  	confirmRemoveCallback(data) {
  		const { id } = data
  		if (isUserLoggedIn) {
	      removeUserData("/walletData/" + id)
	      this.props.closeModal()
	    }
  	}

	render() {
		
		const renderCardList = () => {
			const { walletData } = this.state
			const renderedList = []
	  		for (const key in walletData) {
	  			console.log(walletData[key])
				renderedList.push(
					<Card 
						key={key}
						color={this.getCardColor(walletData[key].type)}
						fiatAmount={1000}
						coinAmount={10}
						coinType={walletData[key].type}
						displayName={walletData[key].displayName}
						address={walletData[key].address}
						removeCard={this.handleRemoveCard}
						cardId={key}
					/>
				)
			}
			return renderedList.map(card => card)
	  	}

	  	const confirmRemoveMessage = (
	  		<div>
	  			<p>Are you sure you want to remove this wallet from your dashboard?</p>
	  		</div>
  		)

		return (	
			<div className="row">
				{renderCardList()}
				<Card addCardStyle={true} color={'blue'} addCard={this.handleAddCard} />
				<ModalGroup 
		          id={this.props.modalId}
		          bodyContent={confirmRemoveMessage}
		          primaryBtnCallback={this.confirmRemoveCallback}
		          headerContent={config.messages.setupModalHeader}
		          primaryBtnContent="Yes"
		          secondayBtnContent="Cancel"
		        />
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
console.log('ownProps', ownProps)
return ({
  openModal: data => dispatch(modal.open(ownProps.modalId, true, data)),
  closeModal: () => dispatch(modal.close(ownProps.modalId, false))
})}

export default connect(null, mapDispatchToProps)(CardContainer);