import { mongoose } from "mongoose"

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
  name: {type: String, required: true},
  foodGroup: {
    type: String, 
    enum: [
      'Vegetable', 
      'Meat/Fish', 
      'Grain', 
      'Dairy', 
      'Fat/Oil', 
      'Fruit', 
      'Herb/Spice', 
      'Other'
    ],
    required: true 
  }
}, {
  timestamps: true
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

export {
  Ingredient
}