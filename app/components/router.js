const express = require('express')

const router = new express.Router()

// paramters example - changing the end of the url will update the variable being passed to the template
router.get('/de-note', function (req, res) {
  res.render('components/form-input-denote.njk')
})

module.exports = router
