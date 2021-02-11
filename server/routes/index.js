import { Router } from 'express'
import axios from 'axios'
import validate from 'express-validation'
import token from '../../token'

import validation from './validation'

import fs from 'fs'

import user from './user'

export default () => {
  let router = Router()

  /** GET /health-check - Check service health */
  router.get('/health-check', (req, res) => res.send('OK'))

  // The following is an example request.response using axios and the
  // express res.json() function
  /** GET /api/rate_limit - Get github rate limit for your token */
  router.get('/rate', (req, res) => {
    axios.get(`http://api.github.com/rate_limit`, {
      headers: {
        'Authorization': token
      }
    }).then(({ data }) => res.json(data))
  })

  /** GET /api/user/:username - Get user */
  router.get('/user/:username', validate(validation.user), async(req, res) => {
  console.log(req.params)
    const username = req.params.username;
    try {
      let userData = await user(username);
      return res.json(userData);
    } catch (error){
    return res.send(error.response.status === 404);
    }
  /*

    TODO
    Fetch data for user specified in path variable
    parse/map data to appropriate structure and return as JSON object
  */
})

  /** GET /api/users? - Get users */
  router.get('/users/', validate(validation.users), (req, res) => {
    console.log(req.query)
    /*
      TODO
      Fetch data for users specified in query
      parse/map data to appropriate structure and return as a JSON array
    */
  })

  router.get('/test', (req, res) => {
    let tester = fs.readFileSync(path.resolve(__dirName, "./axios.JSON"));
    console.log(JSON.parse(tester));
  })




  return router
}
