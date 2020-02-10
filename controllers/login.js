const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// login attempt
loginRouter.post('/', async (request, response) => {
  const body = request.body
    // body has username and password
    // database is searched for  user obj that matches username
  const user = await User.findOne({ username: body.username })
  
    // if no user, this returns false. otherwise it returns
    // a boolean based on comparison of submitted password,
    // converted into hash, and stored password (using bcrypt)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

    // if everythings ok both user and passwordCorrect will == true
    // if not it gets kicked back to client with error msg
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
    // the username is converted into a better format for 
    // token generation -- an object with a username prop and
    // an id prop
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  // a token is generated with jwt middleware; it is signed using
  // a secret code stored in node environmental variables
  const token = jwt.sign(userForToken, process.env.SECRET)
  
  // response is returned with 200 status and token
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter