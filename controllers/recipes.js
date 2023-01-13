import { Recipe } from '../models/recipe.js'

function index(req, res) {
  Recipe.find({})
  .then(recipes => {
    res.render('recipes/index', {
      recipes, 
      title: 'All Recipes'
    })
  })
}

export {
  index,
}