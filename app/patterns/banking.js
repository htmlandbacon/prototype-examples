const express = require('express')

const router = new express.Router()

function validateDetails (details) {
  const errors = {};
  
  if (details.bankAccountHolder === '') {
    errors.bankAccountHolder = "Enter your account holder name";
  }

  if (details.SortCodeField1 === '' || details.SortCodeField2 === '' || details.SortCodeField3 === '') {
    errors.SortCodeField1 = "Enter your sort code";
  }

  if (details.bankAccountNumber === '') {
    errors.bankAccountNumber = "Enter your bank account number";
  }

  return errors;
}



router.get('/introduction', function (req, res) {
  res.render('examples/example1.njk')
})

router.get('/type-of-account', function (req, res) {
  res.render('patterns/banking/account.njk')
})

router.post('/type-of-account', function (req, res) {
  if(req.body.account !== undefined) {
    if (req.body.account === 'banking') {
      res.redirect('/bank-details/bank-details')
    } else {
      res.redirect('/bank-details/building-society')
    }
  } else {
    res.render('patterns/banking/account.njk', {errors: {account: 'Select how would you like to get paid'}})
  }

})

router.get('/bank-details', function (req, res) {
  res.render('patterns/banking/account-details.njk')
})

router.post('/bank-details', function (req, res) {
  const errors = validateDetails(req.body)
  if(Object.keys(errors).length > 0) {
    res.render('patterns/banking/account-details.njk', {data: req.body, errors})
  } else {
    res.redirect('/bank-details/done')
  }
})


router.get('/building-society', function (req, res) {
  res.render('patterns/banking/building-account-details.njk')
})

router.post('/building-society', function (req, res) {
  const errors = validateDetails(req.body)
  if(Object.keys(errors).length > 0) {
    res.render('patterns/banking/building-account-details.njk', {data: req.body, errors})
  } else {
    res.redirect('/bank-details/done')
  }
})

router.get('/done', function (req, res) {
  res.render('patterns/banking/done.njk')
})

module.exports = router
