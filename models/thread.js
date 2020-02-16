// thread model
const mongoose = require('mongoose')
// mongoose.set('useFindAndModify', false)

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
// alters toJSON method of schema so it does not 
// return certain props
threadSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Thread', threadSchema)