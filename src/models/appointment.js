const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const { Schema } = mongoose
const { ObjectId } = Schema.Types

var schema = new Schema({
  __v: { type: Number, select: false },
  patient: { type: ObjectId, ref: 'Patient' },
  slot: { type: ObjectId, ref: 'DentistTimeslot' },
  treatment: { type: ObjectId, ref: 'Treatment' },
  report: { type: ObjectId, ref: 'Report' },
  status: String,
  estimateTime: Number,
  deleted: { type: Boolean, default: false, select: false }
})

schema.plugin(deepPopulate)

export default mongoose.model('Appointment', schema)
