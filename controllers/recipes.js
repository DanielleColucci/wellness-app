import { Recipe } from '../models/recipe.js'
import { Ingredient } from '../models/ingredient.js'

function index(req, res) {
  Recipe.find({})
  .populate('owner')
  .then(recipes => {
    res.render('recipes/index', {
      recipes, 
      title: 'All Recipes'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newRecipe(req, res) {
  res.render('recipes/new', {
    title: 'New Recipe'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Recipe.create(req.body) 
  .then(recipe => {
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function show(req, res) {
  Recipe.findById(req.params.id)
  .populate('owner')
  .then(recipe => {
    res.render('recipes/show', {
      recipe, 
      title: recipe.name
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function edit(req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    Ingredient.find({_id: {$nin: recipe.ingredients}})
    .then(ingredients => {
      res.render('recipes/edit', {
        recipe, 
        ingredients,
        title: 'Edit Recipe'
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function update(req, res) {
  Recipe.findById(req.params.id) 
  .then(recipe => {
    if (recipe.owner.equals(req.user.profile._id)) {
      recipe.updateOne(req.body)
      .then(() => {
        res.redirect(`/recipes/${recipe._id}`)
      })
    } else {
      throw new Error('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function deleteRecipe(req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    if (recipe.owner.equals(req.user.profile._id)) {
      recipe.delete()
      .then(() => {
        res.redirect('/recipes')
      })
    } else {
      throw new Error('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function createReview(req, res) {
  req.body.owner = req.user.profile._id
  req.body.name = req.user.profile.name
  Recipe.findById(req.params.id) 
  .then(recipe => {
    recipe.reviews.push(req.body)
    recipe.save()
    .then(() => {
      res.redirect(`/recipes/${recipe._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function addIngredient(req, res) {
  Recipe.findById(req.params.id) 
  .then(recipe => {
    recipe.ingredients.push(req.body.ingredientId)
    recipe.save()
    .then(() => {
      res.redirect(`/recipes/${recipe._id}/edit`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

export {
  index,
  newRecipe as new,
  create,
  show, 
  edit, 
  update, 
  deleteRecipe as delete,
  createReview,
  addIngredient,
}