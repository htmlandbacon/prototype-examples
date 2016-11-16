const express = require('express')

const router = new express.Router()

// Route index page
router.get('/session', function (req, res) {
  res.render('session.njk', {session: JSON.stringify(req.session.data)})
})

router.post('/session', function (req, res) {
  req.session.data = JSON.parse(req.body.data)
  res.redirect('/utils/session')
})

router.get('/session-full', function (req, res) {
  res.render('session.njk', {session: JSON.stringify(req.session)})
})

module.exports = router
