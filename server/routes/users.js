import axios from 'axios';
import token from '../../token';
export default async(username) => {
  fetch(`${USERS_URL}/${username}`)
  .then(response => response.json()) // Returns parsed json data from response body as promise
  .then(data => {
    let users = {}
    users.push(data)
  }
}
