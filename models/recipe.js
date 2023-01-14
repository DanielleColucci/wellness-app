import mongoose, { Mongoose } from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  owner: String,
  content: String, 
  rating: {
    type: Number, 
    required: true,
    min: 1, 
    max: 5,
    default: 5
  }
}, {
  timestamps: true
})

const recipeSchema = new Schema({
  name: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref:'Profile'},
  estTime: Number,
  meal: {type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Other']},
  ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
  reviews: [reviewSchema],
  instructions: String
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}