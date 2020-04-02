import constants from './constants'
import { request, logout } from '../../api/index'
import { fetchUsers } from '../user/actions'
import { updateTokens, removeTokens } from '../../api/cookies'
import { history } from '../../helpers/history'

function findElem(arr, key, value) {
  for(let i = 0; i < arr.length; i++)
    if (arr[i][key] == value) return arr[i]
}

export function loginUser(data) {
  return async (dispatch, getState) => {
    dispatch(fetchUsers())

    dispatch({ type: constants.LOGIN_REQUEST })

    request("/login", data, "POST", false)
      .then(res => {
        updateTokens(res.data)

        var user = findElem(getState().user.users, "username", data.username)

        dispatch({ type: constants.LOGIN_SUCCESS, payload: user })

        localStorage.setItem('user', JSON.stringify(user))

        history.push('/profile')
      })
      .catch(err => {
        dispatch({ type: constants.LOGIN_ERROR, payload: err })
      })
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch({ type: constants.LOGOUT_REQUEST })

    try {
      logout()
      .then(res => {
        removeTokens()
        localStorage.removeItem('user')
        history.push('/')
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

export function registerUser(data) {
  return dispatch => {
    dispatch({ type: constants.REGISTER_REQUEST })

    request("/register", data, "POST", false)
    .then(res => {
      var tokens = {
        access: res.data.access,
        refresh: res.data.refresh
      }

      updateTokens(tokens)

      dispatch({ type: constants.REGISTER_SUCCESS, payload: res.data.user })

      localStorage.setItem('user', JSON.stringify(res.data))

      history.push('/profile')
    })
    .catch(err => {
      dispatch({ type: constants.REGISTER_ERROR, payload: err })
    })
  }
}