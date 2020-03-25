import API_HOST from './config'
import axios from 'axios'

/* API Calling
 * ----------
 * There will be a main request function. Use it.
 * 
 * Each endpoint will have a function on here for us to call in containers and components. Less code to worry about
 * for each container. The requests should provide all the data needed in a JSON format. If it doesn't, we will change
 * that.
 */

async function request(endpoint, body, type, authenticated, contentType="application/json") {
  var headers = {
    'Content-Type': contentType
  }

  if (authenticated) {
    //Setup authentication checks here and add header with token
  }
  
  var response = await axios({
    method: type,
    url: API_HOST + endpoint,
    headers: headers,
    data: body
  })

  return response
}

export default class ChaseYourDreamsAPI {
  constructor() {

  }

  async testCall() {
    var response = await request("/", null, "GET", false)

    return response
  }
}