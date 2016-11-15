const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

const utilRoutes = require('./utils/routes.js')
router.use('/utils', utilRoutes);

const routesRoutes = require('./routing/routes.js')
router.use('/routing', routesRoutes);

const routesRoutes2 = require('./routing/routes.js')
router.use('/routing-2', routesRoutes2);

const sessionRoutes = require('./session/routes.js')
router.use('/session', sessionRoutes);

const exampleRoutes = require('./example/routes.js')
router.use('/example', exampleRoutes);

const apiRoutes = require('./api/routes.js')
router.use('/api', apiRoutes);

const loginRoutes = require('./login/routes.js')
router.use('/tutorials', loginRoutes);

const loginRoutesNoApi = require('./login/routes-less.js')
router.use('/tutorials', loginRoutesNoApi);

module.exports = router
