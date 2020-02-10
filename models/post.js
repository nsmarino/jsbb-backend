const mongoose = require('mongoose')
// mongoose.set('useFindAndModify', false)

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 1,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
// alters toJSON method of schema so it does not 
// return certain props
postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Post', postSchema)