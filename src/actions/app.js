import {
  CHANGE_LOGIN,
  SET_USERS,
  DELETE_USERS,
  SIGNUP_ERROR
} from '../constants/actionTypes'

export const changeLogin = (isLoggedIn) => {
  return {
    type: CHANGE_LOGIN,
    payload: {
      isLoggedIn: isLoggedIn
    }
  }
};

export const deleteUser = (id) => {
  return (dispatch) => {
    fetch(`http://localhost:3033/users/${id}`, {
      method: 'DELETE',
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
          type: DELETE_USERS,
          payload: id
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

export const getUsers = () => {
  return (dispatch) => {
    fetch('http://localhost:3033/users', {
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
        return dispatch({
          type: SET_USERS,
          payload: resp.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

export const signUp = ({ email, pass }, history) => {
  return (dispatch) => {
    fetch('http://localhost:3033/users/signUp', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        pass
      })
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
        return history.push('/signIn')
      })
      .catch((err) => {
        const errorOb = err.message;

        dispatch({
          type: SIGNUP_ERROR,
          payload: errorOb
        })
      })
  }
};

export const signIn = ({ email, pass }) => {
  return (dispatch) => {
    fetch('http://localhost:3033/users/signIn', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        pass
      })
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
          type: CHANGE_LOGIN,
          payload: {
            isLoggedIn: true
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

export const checkSession = (history) => {
  return (dispatch) => {
    fetch('http://localhost:3033/users/checkAuthentication?type=text', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
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
          type: CHANGE_LOGIN,
          payload: {
            user: resp.user,
            isLoggedIn: true
          }
        })
      })
      .catch((err) => {
        return history.push('/signIn')
      })
  }
};