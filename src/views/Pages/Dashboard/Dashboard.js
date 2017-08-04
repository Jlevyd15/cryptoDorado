import React, { Component } from 'react';
import { db, auth, isAuthenticated, updateUserData, removeUserData, isUserLoggedIn, getLoggedInUserRef } from '../../../firebase';
import * as firebase from 'firebase';

// import Card from '../../components/Card'
import CardContainer from '../../../components/Card/CardContainer'
import StackedAreaChart from '../../../components/StackedAreaChart'
import ModalGroup from '../../../components/ModalGroup'
import StepZilla from 'react-stepzilla'

//utils
import config from '../../../utils/projectConfig';
import constants from '../../../utils/constants';

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
    const firstStepContent = (
      <div className="animated fadeIn">
        <p>This is the first step content</p>
        <div className="card">
          <div className="card-header">
            <strong>ETH Wallet Address Setup</strong>
          </div>
          <div className="card-block">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="walletAddress">Wallet Address</label>
                  <input type="text" className="form-control" id="walletAddress" placeholder="ETH wallet address here"/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-sm-6">
                <label htmlFor="ccmonth">Month</label>
                <select className="form-control" id="ccmonth">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="ccyear">Year</label>
                <select className="form-control" id="ccyear">
                  <option>2014</option>
                  <option>2015</option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                  <option>2020</option>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                  <option>2024</option>
                  <option>2025</option>
                </select>
              </div>
              {/*<div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="cvv">CVV/CVC</label>
                  <input type="text" className="form-control" id="cvv" placeholder="123"/>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    )

    const secondStepContent = (
      <div className="animated fadeIn">
        <p>This is the second step content</p>
      </div>
    )

    const setupWizardData =
      [
        {name: 'Step 1', component: firstStepContent},
        {name: 'Step 2', component: secondStepContent},
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

        <StackedAreaChart />

        <CardContainer walletData={this.state.walletData} modalId={config.ids.modals.confirm} />
        
      </div>
    )
  }
}

export default Dashboard;
