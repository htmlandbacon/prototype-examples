const express = require('express')

const router = new express.Router()

const sortCode = require('i-don-t-know-what-to-call-this-sort-code-thing');

// ask for basic information
router.get('/details', function (req, res) {
    res.render('sort-code/bank-details.njk')
})

router.post('/details', function (req, res) {
    if (req.body.bank.accountNumber != '' 
    &&  req.body.bank.accountName != ''
    && req.body.bank.sortCode01 != ''
    && req.body.bank.sortCode02 != ''
    && req.body.bank.sortCode03 != '') {
    if (sortCode(`${req.body.bank.sortCode01}${req.body.bank.sortCode02}${req.body.bank.sortCode03}`) === true) {
      res.redirect('building');
    } else {
      res.redirect('review');
    }


} else {
    const error = {};
    if (req.body.bank.accountName === '') {
      error.accountName = 'Complete this field'
    }
    if (req.body.bank.accountNumber === '') {
        error.accountNumber = 'Complete this field'
    }
    if (req.body.bank.sortCode01 === '' || req.body.bank.sortCode02 === '' || req.body.bank.sortCode03 === '') {
        error.sortCode = 'Complete this field'
    }
    res.render('sort-code/bank-details.njk', {error: error});
}
})

router.get('/review', function (req, res) {
  res.render('sort-code/review.njk')
})

router.get('/building', function (req, res) {
  res.render('sort-code/building.njk')
})

router.post('/building', function (req, res) {

  if (req.body.building.rollNumber === '') {
    const error = {};
    if (req.body.building.rollNumber === '') {
      error.rollNumber = 'Complete this field'
    }
    res.redirect('details/building', error)
  } else {
    res.redirect('details/review')
  }
})

module.exports = router
