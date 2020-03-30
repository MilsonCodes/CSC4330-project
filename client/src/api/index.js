import API_HOST from './config'
import axios from 'axios'
import cookies from 'js-cookie'

/* API Calling
 * ----------
 * There will be a main request function. Use it.
 * 
 * Each endpoint will have a function on here for us to call in containers and components. Less code to worry about
 * for each container. The requests should provide all the data needed in a JSON format. If it doesn't, we will change
 * that.
 */
const request = async (endpoint, body, type, authenticated, contentType="application/json") => {
  var headers = {
    'Content-Type': contentType
  }

  if (authenticated) {
    if(!getAccessToken()) await refreshAccessToken()

    headers['Authorization'] = `Bearer ${getAccessToken()}`
  }
  
  var response = await axios({
    method: type,
    url: API_HOST + endpoint,
    headers: headers,
    data: body
  })

  return response
}

async function refreshAccessToken() {
  const refresh = getRefreshToken()

  if(!refresh) throw new Error("No valid refresh token exists!")

  var response = await axios({
    method: "GET",
    url: API_HOST + "/token/refresh/",
    headers: {
      'Content-Type': "application/json",
      'Authentication': `Bearer ${refresh}`
    }
  })

  updateTokens(response.data)
}

/**
 * Cookie Handling
 * ----------------------
 * For the tokens only, we will store these in a HTTP only cookie (security)
 * Everything else will be stored in the redux state store
 */
const accessCookieName = "access_token"          //We'll make this more secure later
const refreshCookieName = "refresh_token"        //We'll make this more secure later as well

function getAccessToken() {
  return cookies.get(accessCookieName)
}

function getRefreshToken() {
  return cookies.get(refreshCookieName)
}

function updateTokens(tokens) {
  cookies.set(accessCookieName, accessToken, { expires: 1/24 })
  if(tokens.refresh_token) cookies.set(refreshCookieName, refreshToken, { expires: 365 })
}

function removeTokens() {
  cookies.remove(accessCookieName)
  cookies.remove(refreshCookieName)
}

/* Exports */
export { request, updateTokens, removeTokens }