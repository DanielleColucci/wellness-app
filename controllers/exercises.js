import { Exercise } from '../models/exercise.js'
import { Profile } from '../models/profile.js'

function newExercise(req, res) {
  res.render('exercises/new', {
    title: 'log exercise'
  })
}

export {
  newExercise as new,
}