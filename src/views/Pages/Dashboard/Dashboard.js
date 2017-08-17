import React, { Component } from 'react';
import { db, auth, isAuthenticated, updateUserData, removeUserData, isUserLoggedIn, getLoggedInUserRef } from '../../../firebase';
import * as firebase from 'firebase';

// import Card from '../../components/Card'
import CardContainer from '../../../components/Card/CardContainer'
import StackedAreaChart from '../../../components/StackedAreaChart'
import ModalGroup from '../../../components/ModalGroup'
import Table from '../../../components/Table'
import MetricsGroup from '../../../components/MetricsGroup'
import StepZilla from 'react-stepzilla'

//utils
import config from '../../../utils/projectConfig';
import constants from '../../../utils/constants';
import * as setupWizardContent from './setupWizardContent'

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    // this.handleWriteData = this.handleWriteData.bind(this);
    // this.handleRemoveData = this.handleRemoveData.bind(this);
    this.state = {
      dropdownOpen: false,
      setupFinished: true,
      firebase: 'hello world',
      walletData: ''
    };
  }

  componentWillMount() {
    // *** show the setup wizard when page loads and the user has not finished it ***
    // console.log(getLoggedInUserRef(), 'getLoggedInUserRef')
    if (getLoggedInUserRef()) {
        getLoggedInUserRef().child('setupFinished').on('value', snap => {
        console.log('setupFinished value ', snap.val())
        if (snap.val()) {
          this.setState({ setupFinished: snap.val()})
        }
      }) 
    }

    
    auth.onAuthStateChanged(user => {
       // console.log('user', user.uid)
       if (user) {
       // console.log('user id', user.uid)
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

    // if (getLoggedInUserRef) {
    //   getLoggedInUserRef().child('walletData').on('value', snap => {
    //     console.log('walletData value ', snap.val())
    //     if (snap.val()) {
    //       this.setState({ walletData: snap.val() })
    //     } 
    //   })
    // }
    // const rootRef = firebase.database().ref();
    // const dataRef = rootRef.child('test')
    // dataRef.on('value', snap => {
    //   this.setState({
    //     firebase: snap.val()
    //   })
    // })
    // if (isUserLoggedIn) {
    //   updateUserData("walletData", { address: '123xyz', type: constants.coinTypes.BTC })
    // }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


  render() {


    const setupWizardData =
      [
        {name: 'Step 1', component: setupWizardContent.firstStepContent},
        {name: 'Step 2', component: setupWizardContent.secondStepContent},
        {name: 'Step 3', component: setupWizardContent.thirdStepContent},
        {name: 'Step 4', component: setupWizardContent.fourthStepContent},
        {name: 'Step 5', component: setupWizardContent.firthStepContent},
        {name: 'Step 6', component: setupWizardContent.sixthStepContent},
      ]

    const setupModalBody = (
      <div className="step-progress">
        <StepZilla steps={setupWizardData} dontValidate={true} />
      </div>
    )

    return (
      <div className="animated fadeIn">
        
        <ModalGroup 
          id={config.ids.modals.setup}
          bodyContent={setupModalBody}
          hideFooter={true}
          headerContent={config.messages.setupModalHeader}
        />

        {/*<Table />*/}
        <MetricsGroup />
        <StackedAreaChart walletData={this.state.walletData} />
        
      </div>
    )
  }
}

export default Dashboard;
