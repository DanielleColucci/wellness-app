import { Router } from 'express'
import * as exercisesCtrl from '../controllers/exercises.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET /exercises/new
router.get('/new', exercisesCtrl.new)

export {
  router
}