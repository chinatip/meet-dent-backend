const mongoose = require('mongoose')
const { Schema } = mongoose

var schema = new Schema({
  __v: { type: Number, select: false },
  name: String,
  detail: String,
  price: String,
  deleted: { type: Boolean, default: false, select: false }
})

export default mongoose.model('Treatment', schema)
