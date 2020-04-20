import API_HOST from './config'
import axios from 'axios'
import { getAccessToken, getRefreshToken, updateTokens } from './cookies'

/* API Calling
 * ----------
 * There will be a main request function. Use it.
 * 
 * Each endpoint will have a function on here for us to call in containers and components. Less code to worry about
 * for each container. The requests should provide all the data needed in a JSON format. If it doesn't, we will change
 * that.
 */
export const request = async (endpoint, body, type, authenticated, contentType="application/json", headerAdd={}) => {
  var headers = {
    'Content-Type': contentType,
    ...headerAdd
  }

  if (authenticated) {
    if(!getAccessToken()) await refreshAccessToken()

    headers['Authorization'] = `Bearer ${getAccessToken()}`
  }
  
  return axios({
    method: type,
    url: API_HOST + endpoint,
    headers: headers,
    data: body
  })
}

async function refreshAccessToken() {
  const refresh = getRefreshToken()

  if(!refresh) throw new Error("No valid refresh token exists!")

  var response = await axios({
    method: "POST",
    url: API_HOST + "/token/refresh/",
    headers: {
      'Content-Type': "application/json",
    },
    data: {
      refresh: refresh
    }
  })

  updateTokens(response.data)
}

export const logout = () => {
  const refresh = getRefreshToken()

  if(!refresh) throw new Error("No valid refresh token exists!")

  return axios({
    method: "POST",
    url: API_HOST + "/logout",
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer ${getAccessToken()}`
    },
    data: {
      refresh: refresh
    }
  })
}