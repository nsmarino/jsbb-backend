const postsRouter = require('express').Router()
const Post = require('../models/post')
const User = require('../models/user') 
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)  
  }  
  return null
}

postsRouter.get('/', async (request, response) => {
  const posts = await Post
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(posts.map(post => post.toJSON()))
})

postsRouter.get('/:id', async (request, response, next) => {
  try {
    const post = await Post.findById(request.params.id)
    if (post) {
      response.json(post.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

postsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)

  try {    
    const decodedToken = jwt.verify(token, process.env.SECRET)    
    if (!token || !decodedToken.id) {      
      return response.status(401).json({ error: 'token missing or invalid' })    
    }
    const user = await User.findById(decodedToken.id)
    const post = new Post({
      content: body.content,
      date: new Date(),
      // user: user._id,
      user: user
    })
    const savedPost = await post.save()

    user.posts = user.posts.concat(savedPost._id)    
    await user.save()    
    response.json(savedPost.toJSON())
  } catch(exception) {
    next(exception)
  }
})

postsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Post.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

postsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const post = {
    content: body.content,
    // important: body.important,
  }

  Post.findByIdAndUpdate(request.params.id, post, { new: true })
    .then(updatedPost => {
      response.json(updatedPost.toJSON())
    })
    .catch(error => next(error))
})

module.exports = postsRouter