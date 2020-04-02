import constants from './constants'

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  users: [],
  entities: {}
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
    case constants.FETCH_DATA_REQUEST: {
      return { ...state, loading: true, loaded: false }
    }
    case constants.FETCH_DATA_SUCCESS: {
      return { ...state, loading: false, loaded: true, entities: action.payload }
    }
    case constants.FETCH_DATA_ERROR: {
      return { ...state, loading: false, error: action.payload }
    }
  }

  return state
}