import { mongoose } from "mongoose"

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
  type: {type: String, required: true},
  duration: Number, 
  date: Date,
  share: Boolean, 
  comments: String
}, {
  timestamps: true
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

export {
  Exercise
}