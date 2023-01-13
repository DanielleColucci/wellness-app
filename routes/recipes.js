import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'

const router = Router()

// GET /recipes
router.get('/', recipesCtrl.index)

export {
  router
}