import constants from './constants'

//TODO: SEPARATE ALL THE DATA FETCHES FOR LESS HEADACHE
const initialState = {
  loading: false,
  loaded: false,
  error: null,
  users: [],
  entities: {},
  userProfile: null,
  profile: null
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
      return { ...state, loading: false, loaded: true, entities: { ...state.entities, ...action.payload } }
    }
    case constants.FETCH_DATA_ERROR: {
      return { ...state, loading: false, error: action.payload }
    }
    case constants.FETCH_MAIN_PROFILE_REQUEST: {
      return { ...state, loading: true, loaded: false }
    }
    case constants.FETCH_MAIN_PROFILE_SUCCESS: {
      return { ...state, loading: false, loaded: true, userProfile: action.payload }
    }
    case constants.FETCH_MAIN_PROFILE_ERROR: {
      return { ...state, loading: false, loaded: false, error: action.payload }
    }
    case constants.FETCH_PROFILE_REQUEST: {
      return { ...state, loading: true, loaded: false }
    }
    case constants.FETCH_PROFILE_SUCCESS: {
      return { ...state, loading: false, loaded: true, profile: action.payload }
    }
    case constants.FETCH_PROFILE_ERROR: {
      return { ...state, loading: false, loaded: false, error: action.payload }
    }
  }

  return state
}