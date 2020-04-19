import axios from 'axios'

export default function getStateFromZipCode(zipCode, callback, errCallback) {
  axios({
    method: "GET",
    url: "http://ZiptasticAPI.com/" + zipCode
  }).then(res => callback(res.data.state))
  .catch(err => errCallback(err))
}