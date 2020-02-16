// thread controller
const threadsRouter = require('express').Router()
const Thread = require('../models/thread')

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

threadsRouter.get('/', async (request, response) => {
    const threads = await Thread
      .find({})
      .populate({
        path: 'posts',
        populate: { path: 'user'}
      })
      .populate('user', { username: 1 })

    response.json(threads.map(thread => thread.toJSON()))
  })


threadsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = getTokenFrom(request)
  
    try {  
      // authenticate user  
      const decodedToken = jwt.verify(token, process.env.SECRET)                 
      if (!token || !decodedToken.id) {                                          
        return response.status(401).json({ error: 'token missing or invalid' })     
      }                                                                          
      const date = new Date()
      const user = await User.findById(decodedToken.id)

      const thread = new Thread({
        title: body.title,
        date: date,
        user: user
      })

      const savedThread = await thread.save()

      const post = new Post({
        content: body.post,
        date: date,
        user: user,
        thread: savedThread
      })
      const savedPost = await post.save()

      savedThread.posts = savedThread.posts.concat(savedPost._id)
      const savedThreadWithPosts = await savedThread.save()

      user.threads = user.threads.concat(savedThread._id)
      user.posts = user.posts.concat(savedPost._id)  
      await user.save()    
      response.json(savedThreadWithPosts.toJSON())
    } catch(exception) {
      next(exception)
    }
  })

threadsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Thread.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

threadsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)

  try {  
    // authenticate user  
    const decodedToken = jwt.verify(token, process.env.SECRET)                 
    if (!token || !decodedToken.id) {                                          
      return response.status(401).json({ error: 'token missing or invalid' })     
    }                                                                          
    const date = new Date()
    const user = await User.findById(decodedToken.id)
    const thread = await Thread.findById(request.params.id)
    
    const post = new Post({
      content: body.post,
      date: date,
      user: user,
      thread: thread
    })
    console.log(post)
    const savedPost = await post.save()

    thread.posts = thread.posts.concat(savedPost._id)
    const threadWithPost = await thread.save()

    updatedThread = await Thread
      .findByIdAndUpdate(request.params.id, threadWithPost, { new: true })
      .populate({
        path: 'posts',
        populate: { path: 'user'}
      })
      
    response.json(updatedThread.toJSON())

  } catch(exception) {
    next(exception)
  }
})

  module.exports = threadsRouter