const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose
  .connect(url, { family: 4 })

  .then((_result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (phone_num) {
        const parts = phone_num.split('-')
        if (parts.length !== 2) return false
        if (parts[0].length !== 2 && parts[0].length !== 3) return false
        return /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1])
      },
      message: (_props) => '$Phone number does not have the required format!',
    },
    required: true,
  },
})

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
