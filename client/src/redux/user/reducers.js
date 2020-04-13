import constants from './constants'

//TODO: SEPARATE ALL THE DATA FETCHES FOR LESS HEADACHE
const initialState = {
  loading: false,
  loaded: false,
  error: null,
  users: []
}

export default (state=initialState, action) => {
  switch(action.type) {
    case constants.FETCH_USERS_REQUEST: {
      return { ...state, loading: true, loaded: false }
    }
    case constants.FETCH_USERS_SUCCESS: {
      return { ...state, loading: false, loaded: true, users: action.payload }
    }
    case constants.FETCH_USERS_ERROR: {
      return { ...state, loading: false, error: action.payload }
    }
  }

  return state
}