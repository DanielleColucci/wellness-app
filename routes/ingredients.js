import { Router } from 'express'
import * as ingredientsCtrl from '../controllers/ingredients.js'

const router = Router()

// POST /ingredients
router.post('/', ingredientsCtrl.create)

export {
  router
}