const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// get list of users
usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('posts', { content: 1, date: 1 })

    response.json(users.map(u => u.toJSON()))
  })


// create new user
usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter