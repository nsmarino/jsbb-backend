// only contains Schema definition of notes for mongoDB
// exported for use by Controller (notesRouter)

const mongoose = require('mongoose')
// mongoose.set('useFindAndModify', false)

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
// alters toJSON method of schema so it does not 
// return certain props
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Note', noteSchema)