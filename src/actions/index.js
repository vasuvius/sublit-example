import axios from 'axios';

export const ROOT_URL = 'https://sublit-cs52-project.herokuapp.com/api';

// keys for actiontypes
// going to need chat actions
export const ActionTypes = {
  FETCH_LISTINGS: 'FETCH_LISTINGS',
  FETCH_LISTING: 'FETCH_LISTING',
  FETCH_FILTERED: 'FETCH_FILTERED',
  AUTH_USER: 'AUTH_USER',
  FETCH_USER: 'FETCH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_CONVERSATIONS: 'FETCH_CONVERSATIONS',
  FETCH_CONVERSATION: 'FETCH_CONVERSATION',
  FETCH_MESSAGE: 'FETCH_MESSAGE',
  ERROR_SET: 'ERROR_SET',
  ERROR_CLEAR: 'ERROR_CLEAR',
};

export function fetchFiltered(filters) {
  console.log(filters);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/filter`, filters, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_FILTERED, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// need to incorporate sorting based on season, number of people, etc.
export function fetchListings() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/listings`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_LISTINGS, payload: response.data });
      })
      .catch((error) => {
        if (error.response && error.response.data.includes('<')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        }
      });
  };
}

// fields on listing are tentative
export function createListing(listing, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/listings`, listing, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        if (error.response && error.response.data.includes('<')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        }
      });
  };
}

export function updateListing(listing) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/listings/${listing.id}`, listing, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_LISTING, payload: response.data });
      })
      .catch((error) => {
        if (error.response && error.response.data.includes('<')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        }
      });
  };
}

export function fetchListing(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/listings/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_LISTING, payload: response.data });
      })
      .catch((error) => {
        if (error.response && error.response.data.includes('<')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        }
      });
  };
}

export function deleteListing(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/listings/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        if (error.response && error.response.data.includes('<')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        }
      });
  };
}
// create conversation (needs to be changed after talking w/ caroline/chase)
// could be an issue with creating conversations here (not transactional, one could be created but the otehr might not be)
// need to look into preventing duplicate conversations (could be done with button in listing )
export function startConversation(user1, user2, history) {
  return (dispatch) => {
    const person1 = {
      email: user1.email,
      update: {
        conversations: [...user1.conversations, { email: user2.email, firstName: user2.firstName }],
      },
    };
    const person2 = {
      email: user2.email,
      update: {
        conversations: [...user2.conversations, { email: user1.email, firstName: user1.firstName }],
      },
    };
    const conversation = { email: user2.email, firstName: user2.firstName };
    axios.put(`${ROOT_URL}/updateuserinfo`, person1, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        axios.put(`${ROOT_URL}/updateuserinfo`, person2, { headers: { authorization: localStorage.getItem('token') } })
          .then((res) => {
            dispatch({ type: ActionTypes.FETCH_CONVERSATION, conversation, messages: [] });
            history.push('/chat');
          })
          .catch((err) => {
            if (err.response && err.response.data.includes('<')) {
              dispatch({ type: ActionTypes.ERROR_SET, errorMessage: err.response.statusText });
            } else {
              dispatch({ type: ActionTypes.ERROR_SET, errorMessage: err.response.data });
            }
          });
      })
      .catch((error) => {
        if (error.response && error.response.data.includes('<')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        }
      });
  };
}
// needs to be filled in (not sure what parameters/body to send... do we need both id and convo id?)
export function getConversation(conversation, person1Email, person2Email) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/getallmessages`, { person1Email, person2Email }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_CONVERSATION, conversation, messages: response.data });
      })
      .catch((error) => {
        if (error.response && error.response.data.includes('<')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        }
      });
  };
}

export function getConversations(email) {
  return (dispatch) => {
    console.log('test');
    axios.post(`${ROOT_URL}/getuser`, { email }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        console.log(response);
        dispatch({ type: ActionTypes.FETCH_CONVERSATIONS, payload: response.data[0].conversations });
      })
      .catch((error) => {
        if (error.response && error.response.data.includes('<')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        }
      });
  };
}

// needs to be altered
export function sendChatMessage(senderEmail, senderFirstName, recipientEmail, recipientFirstName, text) {
  return (dispatch) => {
    const fields = {
      senderEmail, senderFirstName, recipientEmail, recipientFirstName, text,
    };
    axios.post(`${ROOT_URL}/message`, fields, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_MESSAGE, message: response.data });
      })
      .catch((error) => {
        if (error.response && error.response.data.includes('<')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        }
      });
  };
}

// trigger to deauth if there is error
// added auth actions/reducers, still needs to be implemented on backend and in components
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function fetchUser(email) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/getuser`, { email }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data[0] });
      })
      .catch((error) => {
        if (error.response && error.response.data.includes('<')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        }
      });
  };
}

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        dispatch({ type: ActionTypes.AUTH_USER, email });
        history.push('/');
      })
      .catch((error) => {
        if (error.response) {
          dispatch(authError('Sign in failed: Incorrect username or password'));
        } else {
          dispatch(authError(`Sign Up Failed: ${error}`));
        }
      });
  };
}

export function signupUser({ email, password, firstName }, history) {
  return (dispatch) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@dartmouth.edu$/;
    const valid = emailPattern.test(email);
    if (!valid) {
      dispatch({ type: ActionTypes.AUTH_ERROR, message: 'Sign Up Failed: Email must be a valid Dartmouth address' });
    } else {
      axios.post(`${ROOT_URL}/signup`, { email, password, firstName })
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', email);
          dispatch({ type: ActionTypes.AUTH_USER, email });
          history.push('/');
        })
        .catch((error) => {
          if (error.response) {
            dispatch(authError(`Sign Up Failed: ${error.response.data}`));
          } else {
            dispatch(authError(`Sign Up Failed: ${error}`));
          }
        });
    }
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

export function clearError() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_CLEAR });
  };
}

export function sendError(message) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_SET, errorMessage: message });
  };
}
