const express = require('express')
const rp = require('request-promise')

const router = new express.Router()

// base get page
router.get('/login', function (req, res) {
  res.render('examples/login/input.njk', {url: '/tutorials/login'})
})

// base error page with login/not logged in
router.post('/login', function (req, res) {
  // first of all we do some stuff with request promise, this will make a POST to the below URL
  var request = {
    method: 'POST',
    url: 'http://localhost:3000/api/login-auth',
    body: {
      inviteKey: req.body.inviteKey
    },
    json: true
  }
  /*

  promises are neat -

  then, takes the good return

  catch, takes the error

  In our case if we pass the wrong key in i.e not MRST3434300, or the value set by API_INVITE_KEY, we'll return an error (404, not found).

  */

  rp(request)
    .then(function (body) {
      // This will render out the details from the API
      res.render('examples/login/details.njk', body)
    })
    .catch(function (err) {
      // This will then render the orginal page with and error
      console.log(err.message)
      res.render('examples/login/input.njk', {inviteKey: req.body.inviteKey, error: 'Invite key is invalid.'})
    })
})

module.exports = router
