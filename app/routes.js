const express = require('express')

const router = new express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

const utilRoutes = require('./utils/routes.js')

router.use('/utils', utilRoutes)

const routesRoutes = require('./routing/routes.js')

router.use('/routing', routesRoutes)

const routesRoutes2 = require('./routing/routes.js')

router.use('/routing-2', routesRoutes2)

const sessionRoutes = require('./session/routes.js')

router.use('/session', sessionRoutes)

const exampleRoutes = require('./example/routes.js')

router.use('/example', exampleRoutes)

const apiRoutes = require('./api/routes.js')

router.use('/api', apiRoutes)

const tutorialRoutes = require('./tutorials/routes.js')

router.use('/tutorials', tutorialRoutes)

const loginRoutes = require('./login/routes.js')

router.use('/tutorials', loginRoutes)

const loginRoutesNoApi = require('./login/routes-less.js')

router.use('/tutorials', loginRoutesNoApi)

const exercisesOne = require('./exercises/one.js')

// exercises routes

router.use('/exercises', exercisesOne)

const exercisesTwo = require('./exercises/two.js')

router.use('/exercises', exercisesTwo)

// auto session
const autoSession = require('./auto-session/routes.js')

router.use('/auto-session', autoSession)

// banking demo
const bankDetails = require('./sort-code/routes.js')

router.use('/bank', bankDetails)

// examples from you */

const leeds = require('./team/leeds.js')

router.use('/leeds', leeds)

module.exports = router
