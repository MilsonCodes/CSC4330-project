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

export function fetchCompanies() {
  return dispatch => {
    dispatch({ type: constants.FETCH_DATA_REQUEST })

    request("/company/", null, "GET", false)
    .then(res => {
      const data = {
        companies: res.data
      }

      dispatch({ type: constants.FETCH_DATA_SUCCESS, payload: data })
    })
    .catch(err => dispatch({ type: constants.FETCH_DATA_ERROR, payload: err }))
  }
}

export function fetchProfiles() {
  return dispatch => {
    dispatch({ type: constants.FETCH_DATA_REQUEST })

    request("/users/", null, "GET", true)
    .then(res => {
      const data = {
        profiles: res.data
      }

      dispatch({ type: constants.FETCH_DATA_SUCCESS, payload: data })
    })
    .catch(err => dispatch({ type: constants.FETCH_DATA_ERROR, payload: err }))
  }
}

export function fetchAddresses() {
  return dispatch => {
    dispatch({ type: constants.FETCH_DATA_REQUEST })

    request("/address/", null, "GET", true)
    .then(res => {
      const data = {
        addresses: res.data
      }

      dispatch({ type: constants.FETCH_DATA_SUCCESS, payload: data })
    })
    .catch(err => dispatch({ type: constants.FETCH_DATA_ERROR, payload: err }))
  }
}

export function fetchAllData() {
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

      res = await request("/address/", null, "GET", true)
      data.addresses = res.data

      res = await request("/company/", null, "GET", true)
      data.companies = res.data

      dispatch({ type: constants.FETCH_DATA_SUCCESS, payload: data })
    } catch (err) {
      dispatch({ type: constants.FETCH_DATA_ERROR, payload: err })
    }
  }
}