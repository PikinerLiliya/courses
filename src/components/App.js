import React, { Component, Fragment, PureComponent } from 'react';
import Button from './Button';

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
    console.log('componentDidMount');

    fetch('http://localhost:3030/users', {
      method: 'GET',
      // mode: 'no-cors',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Token': 'sas'
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp;
        }

        return resp.json().then((error) => {
          throw error;
        });
      })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        console.log(resp);

        this.setState({
          items: resp.data
        });
      })
      .catch((err) => {
        console.log(err);
      })
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
    const { buttonText, wasClicked, items } = this.state;

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
          {items.map(this.renderLi)}
        </ul>
      </Fragment>
    );
  }
}

export default App;
