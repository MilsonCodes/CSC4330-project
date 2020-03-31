import constants from './constants'
import { request, logout } from '../../api/index'

export function login(data) {
  return dispatch => {
    dispatch({ type: constants.LOGIN_REQUEST })

    request("/login", data, "POST", false)
      .then(res => {
        dispatch({ type: constants.LOGIN_SUCCESS, payload: res.data })
      })
      .catch(err => {
        dispatch({ type: constants.LOGIN_ERROR, payload: err })
      })
  }
}

export function logout() {
  return dispatch => {
    dispatch({ type: constants.LOGOUT_REQUEST })

    try {
      logout()
      .then(res => {
        //TODO: Figure out what to do with res
        dispatch({ type: constants.LOGOUT_SUCCESS })
      })
      .catch(err => {
        dispatch({ type: constants.LOGOUT_ERROR, payload: err })
      })
    } catch (err) {
      dispatch({ type: constants.LOGOUT_ERROR, payload: err })
    }
  }
}

export function register(data) {
  return dispatch => {
    dispatch({ type: constants.REGISTER_REQUEST })

    request("/register", data, "POST", false)
    .then(res => {
      //Figure out how to properly
      dispatch({ type: constants.REGISTER_SUCCESS, payload: res })
    })
    .catch(err => {
      dispatch({ type: constants.REGISTER_ERROR, payload: err })
    })
  }
}