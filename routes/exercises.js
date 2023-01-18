import { Router } from 'express'
import * as exercisesCtrl from '../controllers/exercises.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET /exercises
router.get('/', exercisesCtrl.index)

// GET /exercises/new
router.get('/new', isLoggedIn, exercisesCtrl.new)

// GET /exercises/:id
router.get('/:id', exercisesCtrl.show)

// GET /exercises/:id/edit
router.get('/:id/edit', isLoggedIn, exercisesCtrl.edit)

// POST /exercises
router.post('/', isLoggedIn, exercisesCtrl.create)

export {
  router
}