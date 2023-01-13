import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET /recipes
router.get('/', recipesCtrl.index)

// GET /recipes/new
router.get('/new', isLoggedIn, recipesCtrl.new)

// POST /recipes
router.post('/', isLoggedIn, recipesCtrl.create)

export {
  router
}