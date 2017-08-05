import React from 'react';
import { messages } from './messages';  

  export const firstStepContent = (
    <div className="animated fadeIn">
      <span dangerouslySetInnerHTML={{ __html: messages.firstStepContent }} />
    </div>
  )
  export const secondStepContent = (
    <div className="animated fadeIn">
      <span dangerouslySetInnerHTML={{ __html: messages.secondStepContent}} />
    </div>
  )
  export const thirdStepContent = (
    <div className="animated fadeIn">
      <span dangerouslySetInnerHTML={{ __html: messages.thirdStepContent}} />
      <img src="/img/setupWizard/checked_view.png" />
    </div>
  )
  export const fourthStepContent = (
    <div className="animated fadeIn">
      <span dangerouslySetInnerHTML={{ __html: messages.fourthStepContent}} />
      <img src="/img/setupWizard/passphrase_generate.png" />
    </div>
  )
  export const firthStepContent = (
    <div className="animated fadeIn">
     <span dangerouslySetInnerHTML={{ __html: messages.fithStepContent}} />
      <img src="/img/setupWizard/key_generated.png" />
    </div>
  )
  export const sixthStepContent = (
    <div className="animated fadeIn">
      <span dangerouslySetInnerHTML={{ __html: messages.sixthStepContent}} />
      <div className="card">
        <div className="card-header">
          <strong>GDAX Dashboard Setup</strong>
        </div>
        <div className="card-block">
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="walletAddress">API Key</label>
                <input type="text" className="form-control" id="walletAddress" placeholder="ETH wallet address here"/>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="walletAddress">Secret</label>
                <input type="text" className="form-control" id="walletAddress" placeholder="ETH wallet address here"/>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="walletAddress">Passphrase</label>
                <input type="text" className="form-control" id="walletAddress" placeholder="ETH wallet address here"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )