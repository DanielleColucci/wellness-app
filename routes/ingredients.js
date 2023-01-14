import { Router } from 'express'
import * as ingredientsCtrl from '../controllers/ingredients.js'

const router = Router()

// POST /ingredients/:recipeId
router.post('/:recipeId', ingredientsCtrl.create)

export {
  router
}