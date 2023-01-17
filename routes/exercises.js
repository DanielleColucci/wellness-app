import { Router } from 'express'
import * as exercisesCtrl from '../controllers/exercises.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()



export {
  router
}