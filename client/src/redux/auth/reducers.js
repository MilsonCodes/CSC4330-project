import constants from './constants'
import { updateTokens, removeTokens } from '../../api/cookies'

const initialState = {
  loading: false,
  loaded: false,
  error: null
}

export default reducer = (state=initialState, action) => {
  switch(action.type) {
    case constants.LOGIN_REQUEST: {
      return { ...state, loading: true }
    }
    case constants.LOGIN_SUCCESS: {
      updateTokens(action.payload)
      return { ...state, loading: false, loaded: true }
    }
    case constants.LOGIN_ERROR: {
      return { ...state, loading: false, error: action.payload }
    }
    case constants.LOGOUT_REQUEST: {
      return { ...state, loading: true }
    }
    case constants.LOGOUT_SUCCESS: {
      removeTokens()
      return { ...state, loading: false, loaded: true }
    }
    case constants.LOGOUT_ERROR: {
      return { ...state, loading: false, error: action.payload }
    }
    case constants.REGISTER_REQUEST: {
      return { ...state, loading: true }
    }
    case constants.REGISTER_SUCCESS: {
      //TODO: Register stuff
      return { ...state, loading: false, loaded: true }
    }
  }

  return state
}
