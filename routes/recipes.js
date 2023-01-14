import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET /recipes
router.get('/', recipesCtrl.index)

// GET /recipes/new
router.get('/new', isLoggedIn, recipesCtrl.new)

// GET /recipes/:id
router.get('/:id', recipesCtrl.show)

// GET /recipes/:id/edit
router.get('/:id/edit', isLoggedIn, recipesCtrl.edit)

// POST /recipes
router.post('/', isLoggedIn, recipesCtrl.create)

// POST /recipes/:id/reviews
router.post('/:id/reviews', isLoggedIn, recipesCtrl.createReview)

// PUT /recipes/:id
router.put('/:id', isLoggedIn, recipesCtrl.update)

// DELETE /recipes/:id
router.delete('/:id', isLoggedIn, recipesCtrl.delete)

export {
  router
}