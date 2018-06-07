import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getUsers, deleteUser } from '../actions/app'
import { Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import Posts from './Posts';
import AddOrEditPosts from './AddOrEditPosts';

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
        <NavBar />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/addPost" component={AddOrEditPosts} />
          <Route path="/posts/:id" component={AddOrEditPosts} />
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
