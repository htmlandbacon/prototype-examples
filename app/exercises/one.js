const express = require('express')

const router = new express.Router()

// index router with search get/post
// get: show search bar
// post: show search bar and results or error
router.get('/index', function(req, res){
  res.render('getNino/index.njk')
})

router.post('/index', function(req, res){
  if(req.body.nino.length){
    res.redirect(`/exercises/searchResults/${req.body.nino}`)
  } else {  
    res.render('getNino/index.njk', { error: true})
  }
})

// display record
router.get('/searchResults/:nino',function(req, res){
  res.render('getNino/results.njk', {nino : req.params.nino})
})

router.get('/getNino/:nino',function(req, res){
  const age = req.session.age || 34;
  res.render('getNino/detail.njk', {age, nino : req.params.nino, name : req.query.name, notes : req.session.notes})
})

router.post('/getNino/:nino',function(req, res){
  
  // save the notes in a session
  req.session.notes= req.body.notes

  res.render('getNino/detail.njk', {nino : req.params.nino, name : req.query.name, notes : req.session.notes})
})
// update record 

router.get('/update/:nino/:name', function(req, res){

  res.render('getNino/update.njk', {nino : req.params.nino, name : req.params.name })
})

router.post('/update/:nino/:name', function(req, res){

  req.session.age = req.body.age

  res.redirect(`/exercises/getNino/${req.params.nino}?name=${req.params.name}`)  
})
// update notes


module.exports = router
