import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { updateUserData, isUserLoggedIn} from '../../firebase';
import { connect } from 'react-redux'

import * as styles from './style.css'
//utils
import config from '../../utils/projectConfig';

//actions
import { modal } from '../../actions';

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
    this.props.closeModal();
  }

  handleContinueBtn() {
    // console.log('in continue btn  ')
    this.setState({
      firstStepFinished: true,
    });

    if (this.state.firstStepFinished) {
      // console.log('setup finished')
      this.setState({
        setupFinished: true,
        modal: false
      })
      if (isUserLoggedIn) {
        // TODO - only write this to the DB once. 
        updateUserData('/setupFinished', { setupFinished: true })
      }
    }
  }

  render() {

    const { open, bodyContent, hideFooter, headerContent, primaryBtnCallback, primaryBtnContent, secondayBtnContent } = this.props
    return (
      <div className="animated fadeIn">
        <Modal isOpen={open} toggle={this.toggle} className={'modal-primary ' + this.props.className}>
          <ModalHeader toggle={this.toggle}>{headerContent}</ModalHeader>
          <ModalBody>
            {/*this.state.firstStepFinished ? secondStepContent : firstStepContent)*/}
            {bodyContent}
          </ModalBody>
          { hideFooter ? '':
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>{secondayBtnContent ? secondayBtnContent : 'Cancel'}</Button>
              <Button color="primary" onClick={() => primaryBtnCallback(this.props.modalData.toJS())}>{primaryBtnContent ? primaryBtnContent : 'Continue'}</Button>
            </ModalFooter>
          }
        </Modal>
      </div>
    )
  }
}

ModalGroup.propTypes = {
  id: React.PropTypes.string,
  bodyContent: React.PropTypes.node,
  headerContent: React.PropTypes.string,
  hideFooter: React.PropTypes.bool,
  open: React.PropTypes.bool,
  closeModal: React.PropTypes.func,
  primaryBtnCallback: React.PropTypes.func,
  primaryBtnContent: React.PropTypes.string,
  secondayBtnContent: React.PropTypes.string,
}

const mapStateToProps = (state, props) => ({
  open: state.modals.getIn([props.id, 'open']),
  modalData: state.modals.getIn([props.id, 'data'])
})

const mapDispatchToProps = (dispatch, ownProps) => {
// console.log('ownProps', ownProps)
return ({
  closeModal: () => dispatch(modal.close(ownProps.id, false))
})}

export default connect(mapStateToProps, mapDispatchToProps)(ModalGroup);
