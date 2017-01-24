const express = require('express')

const router = new express.Router()

router.get('/input', function (req, res) {
  res.render('tutorials/input-example.njk')
})

module.exports = router
