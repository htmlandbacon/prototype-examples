const express = require('express')

const router = new express.Router()

// little function to get age or show default - this is reused so moved it here
function getAge(session) {
  return session.age || '34'
}

// little function to get notes or show empty - this is reused so moved it here
function getNote(session) {
  return session.notes || ''
}

// index router with search get/post
// get: show search bar
// post: show search bar and results or error
router.get('/index', function (req, res) {
  res.render('getNino/index.njk')
})

router.post('/index', function (req, res) {
  if (req.body.nino.length) {
    res.redirect(`/leeds/searchResults/${req.body.nino}`)
  } else {
    res.render('getNino/index.njk', {error: true})
  }
})

// display record
router.get('/searchResults/:nino', function (req, res) {
  res.render('getNino/results.njk', {nino: req.params.nino})
})

router.get('/getNino/:nino', function (req, res) {
  console.log(req.session)
  const age = getAge(req.session)
  const notes = getNote(req.session)
  res.render('getNino/detail.njk', {age, notes, nino: req.params.nino, name: req.query.name})
})

router.post('/getNino/:nino', function (req, res) {
  // save the notes in a session
  req.session.note = req.body.notes
  const age = getAge(req.session)
  res.render('getNino/detail.njk', {age, nino: req.params.nino, name: req.query.name, notes: req.body.notes})
})

// update record
router.get('/update/:nino/:name/:age', function (req, res) {
  res.render('getNino/update.njk', {nino: req.params.nino, name: req.params.name, age: req.params.age})
})

// update notes
router.post('/update/:nino/:name/:age', function (req, res) {
  req.session.age = req.body.age
  res.redirect(`/leeds/getNino/${req.params.nino}?name=${req.params.name}`)
})

module.exports = router
