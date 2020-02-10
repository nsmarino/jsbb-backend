// import mongoose
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// define what the user schema should contain,
// including what each prop's datatype should be
// schema : structure of document
// const SCHEMA_NAME = new mongoose.Schema(schema_definition_here)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

// uses validator package to ensure that all attributes listed 
// as UNIQUE: TRUE are, in fact, unique

userSchema.plugin(uniqueValidator)

// customizes exactly what is returned when 
// the toJson method is called
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

// model: interface for CRUD interaction with database
// model answers: are there any records matching this query?
const User = mongoose.model('User', userSchema)

module.exports = User