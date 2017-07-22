import React from 'react';
import { connect } from 'react-redux';

import { db, auth, writeUserData, removeUserData, isUserLoggedIn, getLoggedInUserRef } from '../../firebase';

import constants from '../../utils/constants'

import Card from './'


class CardContainer extends React.Component { 
	constructor(props) {
		super();

		this.getCardColor = this.getCardColor.bind(this);
		this.getFiatAmount = this.getFiatAmount.bind(this);
		this.handleAddCard = this.handleAddCard.bind(this);
    	this.handleRemoveCard = this.handleRemoveCard.bind(this);
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
			    	} )
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
	    if (isUserLoggedIn) {
	      removeUserData("/walletData/" + id)
	    }
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
		return (	
			<div className="row">
				{renderCardList()}
				<Card addCardStyle={true} color={'blue'} addCard={this.handleAddCard} />
			</div>
		)
	}
}

const mapStateToProps = (props, state) => ({
	walletData: 'test'
})

export default connect(null, null)(CardContainer);