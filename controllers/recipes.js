import { Recipe } from '../models/recipe.js'

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
    res.render('recipes/edit', {
      recipe, 
      title: 'Edit Recipe'
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
}