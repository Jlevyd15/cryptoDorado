import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { writeUserData, isUserLoggedIn} from '../../firebase';
import { connect } from 'react-redux'

import StepZilla from 'react-stepzilla'
import * as styles from './style.css'



class ModalGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      firstStepFinished: false,
      setupFinished: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handleContinueBtn = this.handleContinueBtn.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if(nextState.firstStepFinished !== this.state.firstStepFinished) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleContinueBtn() {
    console.log('in continue btn  ')
    this.setState({
      firstStepFinished: true,
    });

    if (this.state.firstStepFinished) {
      console.log('setup finished')
      this.setState({
        setupFinished: true,
        modal: false
      })
      if (isUserLoggedIn) {
        // TODO - only write this to the DB once. 
        writeUserData('/setupFinished', { setupFinished: true })
      }
    }
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

    console.log(this.props.open)
    return (
      <div className="animated fadeIn">
        <Button color="primary" onClick={this.toggle}>Wizard</Button>
          <Modal isOpen={this.props.open} toggle={this.toggle} className={'modal-primary ' + this.props.className}>
            <ModalHeader toggle={this.toggle}>Let's get setup</ModalHeader>
            <ModalBody>
              {/*this.state.firstStepFinished ? secondStepContent : firstStepContent)*/}
              <div className="step-progress">
                <StepZilla steps={setupWizardData} dontValidate={true} />
              </div>
            </ModalBody>
            {/*<ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Back</Button>
              <Button color="primary" onClick={this.handleContinueBtn}>Continue</Button>{' '}
            </ModalFooter>*/}
          </Modal>
      </div>
    )
  }
}

ModalGroup.propTypes = {
  open: React.PropTypes.string
}

export default ModalGroup;
