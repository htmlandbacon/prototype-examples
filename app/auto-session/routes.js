const express = require('express')

const router = new express.Router()

router.get('/starter', function (req, res) {
  res.render('auto-session/starter.njk');
})

router.get('/name', function (req, res) {
  res.render('auto-session/name.njk');
})

router.post('/name', function (req, res) {
    if(req.body.names.lastName != '' && req.body.names.firstName != '') {
        res.redirect('bank')
    } else {
        const error = {};
        if(req.body.names.lastName === '') {
            error.lastName = 'Complete this field'
        }
        if(req.body.names.firstName === '') {
            error.firstName = 'Complete this field'
        }
        res.render('auto-session/name.njk', {error: error})
    }
})

router.get('/bank', function (req, res) {
    res.render('auto-session/bank.njk')
})

router.post('/bank', function (req, res) {
    if(req.body.bank.accountNumber != '' 
        && req.body.bank.sortCode01 != ''
        && req.body.bank.sortCode02 != ''
        && req.body.bank.sortCode03 != '') {
        res.redirect('review')
    } else {
        const error = {};
        if(req.body.bank.accountNumber === '') {
            error.accountNumber = 'Complete this field'
        }
        if(req.body.bank.sortCode01 === '' || req.body.bank.sortCode02 === '' || req.body.bank.sortCode03 === '') {
            error.sortCode = 'Complete this field'
        }
        res.render('auto-session/bank.njk', {error: error})
    }
})

// preloaded example
router.get('/review', function (req, res) {
    res.render('auto-session/review.njk')
})

module.exports = router
