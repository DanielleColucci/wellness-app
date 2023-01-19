import e, { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET /recipes
router.get('/', recipesCtrl.index)

// GET /recipes/new
router.get('/new', isLoggedIn, recipesCtrl.new)

// GET /recipes/breakfast
router.get('/breakfast', recipesCtrl.indexBreakfast)

// GET /recipes/lunch
router.get('/lunch', recipesCtrl.indexLunch)

//GET /recipes/dinner
router.get('/dinner', recipesCtrl.indexDinner)

// GET /recipes/:id
router.get('/:id', recipesCtrl.show)

// GET /recipes/:id/edit
router.get('/:id/edit', isLoggedIn, recipesCtrl.edit)

// POST /recipes
router.post('/', isLoggedIn, recipesCtrl.create)

// POST /recipes/:id/reviews
router.post('/:id/reviews', isLoggedIn, recipesCtrl.createReview)

// POST /recipes/:id/ingredients/:ingredientId
router.post('/:id/ingredients/:ingredientId', isLoggedIn, recipesCtrl.addIngredient)

// PUT /recipes/:id
router.put('/:id', isLoggedIn, recipesCtrl.update)

// DELETE /recipes/:id
router.delete('/:id', isLoggedIn, recipesCtrl.delete)

// DELETE /recipes/:id/reviews/:reviewId
router.delete('/:id/reviews/:reviewId', isLoggedIn, recipesCtrl.deleteReview)

export {
  router
}