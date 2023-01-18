import { Router } from 'express'
import * as exercisesCtrl from '../controllers/exercises.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET /exercises/new
router.get('/new', isLoggedIn, exercisesCtrl.new)

// POST /exercises
router.post('/', isLoggedIn, exercisesCtrl.create)

export {
  router
}