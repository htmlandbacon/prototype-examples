const express = require('express')
const rp = require('request-promise')
const router = express.Router()

// base get page
router.get('/login-no-api', function (req, res) {
  res.render('examples/login/input.njk', {url: '/tutorials/login-no-api'});
})


// base error page with login/not logged in
router.post('/login-no-api', function (req, res) {
  let body = {"inviteKey": (process.env.API_INVITE_KEY || 'MRST3434300'),
                      "name": (process.env.API_NAME || 'John Marston'),
                      "dob": (process.env.API_DOB || '10/10/1220')};
  if(req.body.inviteKey === body.inviteKey) {
      res.render('examples/login/details.njk', body);
  } else {
    res.render('examples/login/input.njk', {inviteKey: req.body.inviteKey, error: 'Invite key is invalid.'});
  }
})

module.exports = router
