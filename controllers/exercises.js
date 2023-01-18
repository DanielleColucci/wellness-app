import { Exercise } from '../models/exercise.js'
import { Profile } from '../models/profile.js'

function newExercise(req, res) {
  res.render('exercises/new', {
    title: 'log exercise',
  })
}

function create(req, res) {
  req.body.share = !!req.body.share
  req.body.owner - req.user.profile._id
  Exercise.create(req.body) 
  .then(exercise => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.exercises.push(exercise)
      profile.save()
      .then(() => {
        res.redirect(`/profiles/${req.user.profile._id}`)
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function index(req, res) {
  Exercise.find({})
  .populate('owner')
  .then(exercises => {
    res.render('exercises/index', {
      exercises,
      title: 'Exercises'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  newExercise as new,
  create,
  index,
}