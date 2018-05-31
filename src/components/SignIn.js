import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signIn } from '../actions/app'

class SignIn extends Component {
  state = {
    email: '',
    pass: ''
  };
  signIn = () => {
    const { email, pass } = this.state;
    const { signIn } = this.props;

    signIn({ email, pass });
  };

  onInputChange = (value, key) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { email, pass } = this.state;

    return (<div>
        <h1>Sign In</h1>
        <Input
          title="Email"
          onInputChange={(value) => {
            this.onInputChange(value, 'email')
          }}
          value={email}
        />
        <Input
          title="Password"
          onInputChange={(value) => {
            this.onInputChange(value, 'pass')
          }}
          value={pass}
          type="password"
        />
        <Button
          title="Submit"
          onClick={this.signIn}
        />
        <NavLink to="/signUp">Don't have account?</NavLink>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signIn
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(SignIn);