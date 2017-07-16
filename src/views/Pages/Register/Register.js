import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { auth, db } from '../../../firebase';

class Register extends Component {
   state = {
    email: '',
    password: '',
    confirm: '',
    redirectToReferrer: false,
    loggedIn: false,
    error: ''
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    // this.setState({showErrors: true});
    // if (this.validateForm()) {
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
        // db.ref().child('users').child(user.uid).set({
        //   email: user.email,
        //   displayName: this.state.displayName
        // });
        // user.updateProfile({
        //   displayName: this.state.displayName
        // });
        this.setState({loggedIn: true});
      }).catch(err => {
        this.setState({ error: err.message })
        console.error(err)
      });
    // }
  }

  validateForm = () => {
    return (
      this.state.email.length > 0 &&
      this.state.displayName.length > 0 &&
      this.state.password.length >= 6 &&
      this.state.password === this.state.confirm
    );
  }

  render() {
    const {error, loggedIn} = this.state;

    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  {loggedIn && (
                    <Redirect to="/dashboard" />
                  )}
                  <p>{error ? error : ''}</p>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <form onSubmit={this.handleSubmit}>
                    {/*<div className="input-group mb-3">
                      <span className="input-group-addon"><i className="icon-user"></i></span>
                      <input 
                        type="text"
                        className="form-control"
                        placeholder="Username"
                       
                      />
                    </div>*/}
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
                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input 
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                      />
                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Repeat password"
                        value={this.state.confirm}
                        onChange={e => this.setState({confirm: e.target.value})}
                      />
                    </div>
                    <button type="submit" className="btn btn-block btn-success">Create Account</button>
                  </form>
                  <div className="card-block text-center">
                    <div>
                      <p>- or -</p>
                      <Link to={'/login'} role='button' className="btn btn-secondary active mt-3">Login Now!</Link>
                    </div>
                  </div>
                </div>
                {/*<div className="card-footer p-4">
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-block btn-facebook" type="button"><span>facebook</span></button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-block btn-twitter" type="button"><span>twitter</span></button>
                    </div>
                  </div>
                </div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
