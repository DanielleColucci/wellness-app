import mongoose from "mongoose"

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
  type: {type: String, required: true},
  duration: Number, 
  date: {type: Date, required: true},
  share: Boolean, 
  comments: String,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

export {
  Exercise
}