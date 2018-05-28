import React, { Component, Fragment, PureComponent } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from './Button';

import { getUsers } from '../actions/app'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonText: 'Test',
      wasClicked: false,
      items: [{
        name: '1'
      }, {
        name: '2'
      }, {
        name: '3'
      }]
    };

    this.setClicked = this.setClicked.bind(this);

    console.log('constructor');
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    const { getUsers } = this.props;
    console.log('componentDidMount');

    getUsers();
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
  }

  /*shouldComponentUpdate(){
    console.log('shouldComponentUpdate');
    return false;
  }*/

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  setClicked(e) {
    const { onButtonClick } = this.props;

    // onButtonClick(e);

    this.setState({
      wasClicked: true,
    }, () => {
      console.log('changed', this.state.wasClicked);
    });

    console.log(this.state.wasClicked);
  }

  renderLi = (el, ind) => {
    return (
      <li key={ind}>{el.name}</li>
    );
  };

  render() {
    const { buttonText, wasClicked } = this.state;

    const { users } = this.props;

    console.log(this.props);

    return (
      <Fragment>
        <h1>Hello world</h1>
        {/*<button
          style={{
            color: wasClicked ? 'red' : 'blue'
          }}
          onClick={this.setClicked}
        >{buttonText}</button>*/}
        <Button
          title={buttonText}
          onClick={this.setClicked}
          className={wasClicked ? 'red-text' : 'blue-text'}
        />
        <Button
          title="TEST2"
          onClick={this.setClicked}
          className={!wasClicked ? 'red-text' : 'blue-text'}
        />
        <ul className="list">
          {users.map(this.renderLi)}
        </ul>
      </Fragment>
    );
  }
}

function mapStoreToProps(store) {
  return {
    users: store.users.items
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUsers,
  }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(App);
