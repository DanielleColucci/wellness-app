import { Ingredient } from "../models/ingredient.js"

function create(req, res) {
  Ingredient.create(req.body)
  .then(ingredient => {
    res.redirect('/recipes/new')
  })
  .catch(err => {
    res.redirect('/recipes')
  })
}

export {
  create,
}