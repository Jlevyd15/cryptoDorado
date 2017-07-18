import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { auth } from '../../../firebase';

class Login extends Component {
  state = {
    email: '',
    password: '',
    redirectToReferrer: false,
    error: ''
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.setState({redirectToReferrer: true});
    }).catch(e => {
      this.setState({ error: e.message })
      console.log('there was an error ' + e.message);
    })
  }

  render() {
    const {from} = this.props.location.state || '/';
    const {redirectToReferrer, error} = this.state;

    return (
      <div className="app flex-row align-items-center">

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div className="card-block">
                    {redirectToReferrer && (
                      <Redirect to={from || '/dashboard'}/>
                    )}
                    {from && (
                      <p>`You must log in to view the page at ${from.pathname}`</p>
                    )}
                    <p>{error ? error : ''}</p>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <form onSubmit={this.handleSubmit}>
                      <div className="input-group mb-3">
                        <span className="input-group-addon">@</span>
                        <input 
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={e => this.setState({email: e.target.value})}
                        />
                      </div>
                      <div className="input-group mb-4">
                        <span className="input-group-addon"><i className="icon-lock"></i></span>
                        <input 
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={e => this.setState({password: e.target.value})}
                        />
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <button type="submit" className="btn btn-primary px-4">Login</button>
                        </div>
                        <div className="col-6 text-right">
                          <button type="button" className="btn btn-link px-0">Forgot password?</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card card-inverse card-primary py-5" >
                  <div className="card-block text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <Link to={'/register'} role='button' className="btn btn-primary active mt-3">Register Now!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
