import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
  exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
