import { Exercise } from '../models/exercise.js'
import { Profile } from '../models/profile.js'

function newExercise(req, res) {
  const newExercise = new Exercise()
  let defaultDate = newExercise.date
  let month= defaultDate.getMonth() + 1
  month = month.toString().padStart(2, '0')
  const day = defaultDate.getDate().toString().padStart(2, '0')
  const year = defaultDate.getFullYear().toString()
  defaultDate = `${year}-${month}-${day}`
  console.log(defaultDate);
  res.render('exercises/new', {
    title: 'Log Exercise',
    defaultDate
  })
}

function create(req, res) {
  req.body.share = !!req.body.share
  req.body.owner = req.user.profile._id
  Exercise.create(req.body) 
  .then(exercise => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.exercises.push(exercise)
      profile.save()
      .then(() => {
        if (req.body.share) {
          res.redirect('/exercises')
        } else {
          res.redirect(`/profiles/${req.user.profile._id}`)
        }
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
      title: 'Public Exercises'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Exercise.findById(req.params.id)
  .populate('owner')
  .then(exercise => (
    res.render('exercises/show', {
      exercise, 
      title: 'Exercise Info'
    })
  ))
  .catch(err => {
    console.log(err)
    res.redirect('/exercises')
  })
}

function edit(req, res) {
  Exercise.findById(req.params.id)
  .then(exercise => {
    let month= exercise.date.getUTCMonth() + 1
    month = month.toString().padStart(2, '0')
    const day = exercise.date.getUTCDate().toString().padStart(2, '0')
    const year = exercise.date.getUTCFullYear().toString()
    res.render('exercises/edit', {
      exercise,
      month,
      day, 
      year,
      title: 'Edit Exercise'
    })
  })
}

function update(req, res) {
  Exercise.findById(req.params.id)
  .then(exercise => {
    if (exercise.owner.equals(req.user.profile._id)) {
      req.body.share = !!req.body.share
      exercise.updateOne(req.body)
      .then(() => {
        if (req.body.share) {
          res.redirect(`/exercises/${exercise._id}`)
        } else {
          res.redirect('/exercises')
        }
      })
    } else {
      throw new Error('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/exercises')
  })
}

function deleteExercise(req, res) {
  Exercise.findById(req.params.id) 
  .then(exercise => {
    if (exercise.owner.equals(req.user.profile._id)) {
      exercise.delete()
      Profile.findById(req.user.profile._id)
      .then(profile => {
        profile.exercises.forEach((exercise, idx) => {
          if (exercise._id.equals(req.params.id)) {
            profile.exercises.splice(idx, 1)
            profile.save()
            .then(() => {
              res.redirect(`/profiles/${req.user.profile._id}`)
            })
          }
        })
      })
    } else {
      throw new Error('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/execises')
  })
}

export {
  newExercise as new,
  create,
  index,
  show, 
  edit, 
  update,
  deleteExercise as delete
}