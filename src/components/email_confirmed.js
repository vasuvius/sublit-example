// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { signInAndConfirmEmail } from '../actions/index';

class EmailConfirmed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    // this.props.match.params.token
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onSubmit = (event) => {
    this.props.signInAndConfirmEmail({ email: this.state.email, password: this.state.password, confirmToken: this.props.match.params.token }, this.props.history);
  }

  render() {
    return (
      <div className="user-creator">
        <h1 className="signInHeader">Sign in to Confirm Your Email</h1>
        <div className="email">
          <h2>Email:</h2>
          <input className="email-input" placeholder="Email Address" onChange={this.onEmailChange} value={this.state.email} />
        </div>
        <div className="pass">
          <h2>Password:</h2>
          <input type="password" className="password-input" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
        </div>
        <div className="iconsBox">
          <ul className="icon-list">
            <li key="return" onClick={this.onSubmit}>
              <i className="fas fa-sign-in-alt" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// enables this.props.signupUser
export default connect(null, { signInAndConfirmEmail })(EmailConfirmed);