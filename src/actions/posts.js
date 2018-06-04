import {
  GET_POSTS,
  ADD_POST,
} from '../constants/actionTypes'

export const getPosts = () => {
  return (dispatch) => {
    fetch('http://localhost:3033/posts', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
        return dispatch({
          type: GET_POSTS,
          payload: resp.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

export const addPost = (data) => {
  return (dispatch) => {
    fetch('http://localhost:3033/posts', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
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
        return dispatch({
          type: ADD_POST,
          payload: resp.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

