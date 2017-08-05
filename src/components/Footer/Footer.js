import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        2017 cryptoDorado
        <span className="float-right">
        	<div className="row">
        		<span className="col-4 col-sm-4">
		        	<a href="http://twitter.com" target="_blank"><i className="icon-social-twitter"/></a>
	        	</span>
	        	<span className="col-4 col-sm-4">
		        	<a href="http://facebook.com" target="_blank"><i className="icon-social-facebook"/></a>
	        	</span>
	        	<span className="col-4 col-sm-4">
		        	<a href="http://linkedin.com" target="_blank"><i className="icon-social-linkedin"/></a>
	        	</span>
        	</div>
    	</span>
      </footer>
    )
  }
}

export default Footer;
