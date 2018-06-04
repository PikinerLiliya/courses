import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getUsers, deleteUser } from '../actions/app'
import { Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import Posts from './Posts';
import AddPosts from './AddPosts';

class App extends Component {
  componentDidMount() {
    const { getUsers } = this.props;

    getUsers();
  }

  deleteUser = (id) => {
    const { deleteUser } = this.props;

    deleteUser(id);
  };

  renderLi = (el, ind) => {
    return (
      <li key={ind}>{el.name}
        <button onClick={() => {
          this.deleteUser(el._id);
        }}>X
        </button>
      </li>
    );
  };

  render() {
    const { users } = this.props;

    return (
      <Fragment>
        <NavBar/>
        <Switch>
          <Route path="/posts" component={Posts}/>
          <Route path="/addPost" component={AddPosts}/>
        </Switch>
        {/*<ul className="list">
          {users.map(this.renderLi)}
        </ul>*/}
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
    deleteUser,
  }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(App);
