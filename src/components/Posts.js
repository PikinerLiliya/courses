import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { array } from 'prop-types'

import { getPosts } from '../actions/posts';

class Posts extends Component {
  componentDidMount() {
    const { getPosts } = this.props;

    getPosts();
  }

  renderPost = (el, ind) => {
    return (
      <li key={el._id}>{el.title}</li>
    );
  };

  render() {
    const { posts } = this.props;

    return (<div>
      <h1>My Posts</h1>
      <ul>
        {posts.map(this.renderPost)}
      </ul>
    </div>);
  }
}

Posts.propTypes = {
  posts: array.isRequired
};

function mapStoreToProps(store) {
  return {
    posts: store.posts.items
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getPosts
  }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(Posts);