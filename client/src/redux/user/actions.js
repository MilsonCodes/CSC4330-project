import constants from './constants'
import { request } from '../../api/index'

export function fetchUsers() {
  return dispatch => {
    dispatch({ type: constants.FETCH_USERS_REQUEST })

    request("/auth/", null, "GET", false)
    .then(res => {
      dispatch({ type: constants.FETCH_USERS_SUCCESS, payload: res.data })
    })
    .catch(err => dispatch({ type: constants.FETCH_USERS_ERROR, payload: err }))
  }
}

export function fetchData() {
  return async dispatch => {
    dispatch({ type: constants.FETCH_DATA_REQUEST })

    var data = {
      profiles: [],
      companies: [],
      addresses: []
    }

    try {
      var res = await request("/users/", null, "GET", true)
      data.profiles = res.data

      res = request("/address/", null, "GET", true)
      data.addresses = res.data

      res = request("/company/", null, "GET", true)
      data.companies = res.data

      dispatch({ type: constants.FETCH_DATA_SUCCESS, payload: data })
    } catch (err) {
      dispatch({ type: constants.FETCH_DATA_ERROR, payload: err })
    }
  }
}