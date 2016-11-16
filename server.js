const path = require('path')
const express = require('express')
const session = require('express-session')
const nunjucks = require('nunjucks')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const browserSync = require('browser-sync')

const routes = require('./app/routes.js')
const config = require('./app/config.js')
const utils = require('./lib/utils.js')
const packageJson = require('./package.json')

let app = express()

// Grab environment variables specified in Procfile or as Heroku config vars
const releaseVersion = packageJson.version
const username = process.env.USERNAME
const password = process.env.PASSWORD
let env = process.env.NODE_ENV || 'development'
let useAuth = process.env.USE_AUTH || config.useAuth
let useHttps = process.env.USE_HTTPS || config.useHttps

env = env.toLowerCase()
useAuth = useAuth.toLowerCase()
useHttps = useHttps.toLowerCase()

// Authenticate against the environment-provided credentials, if running
// the app in production (Heroku, effectively)
if (env === 'production' && useAuth === 'true') {
  app.use(utils.basicAuth(username, password))
}

// Set up App
const appViews = [path.join(__dirname, '/app/views/'), path.join(__dirname, '/lib/')]

const nunjucksAppEnv = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
})

// Nunjucks filters
utils.addNunjucksFilters(nunjucksAppEnv)

// Set views engine
app.set('view engine', 'html')

// Middleware to serve static assets
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/public', express.static(path.join(__dirname, '/govuk_modules/govuk_template/assets')))
app.use('/public', express.static(path.join(__dirname, '/govuk_modules/govuk_frontend_toolkit')))
app.use('/public/images/icons', express.static(path.join(__dirname, '/govuk_modules/govuk_frontend_toolkit/images')))

// Elements refers to icon folder instead of images folder
app.use(favicon(path.join(__dirname, 'govuk_modules', 'govuk_template', 'assets', 'images', 'favicon.ico')))

// Support for parsing data in POSTs
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Support session data
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: Math.round(Math.random() * 100000).toString()
}))

// send assetPath to all views
app.use(function (req, res, next) {
  res.locals.asset_path = '/public/'
  next()
})

// Add variables that are available in all views
app.use(function (req, res, next) {
  res.locals.serviceName = config.serviceName
  res.locals.cookieText = config.cookieText
  res.locals.releaseVersion = 'v' + releaseVersion
  next()
})

// Force HTTPs on production connections
if (env === 'production' && useHttps === 'true') {
  app.use(utils.forceHttps)
}

// Disallow search index idexing
app.use(function (req, res, next) {
  // Setting headers stops pages being indexed even if indexed pages link to them.
  res.setHeader('X-Robots-Tag', 'noindex')
  next()
})

app.get('/robots.txt', function (req, res) {
  res.type('text/plain')
  res.send('User-agent: *\nDisallow: /')
})

// routes (found in app/routes.js)
if (typeof (routes) === 'function') {
  app.use('/', routes)
} else {
  console.log(routes.bind)
  console.log('Warning: the use of bind in routes is deprecated - please check the prototype kit documentation for writing routes.')
  routes.bind(app)
}

// Strip .html and .htm if provided
app.get(/\.html?$/i, function (req, res) {
  let path = req.path
  let parts = path.split('.')
  parts.pop()
  path = parts.join('.')
  res.redirect(path)
})

// Auto render any view that exists

// App folder routes get priority
app.get(/^\/([^.]+)$/, function (req, res) {
  utils.matchRoutes(req, res)
})

console.log('\nGOV.UK Prototype kit v' + releaseVersion)
// Display warning not to use kit for production services.
console.log('\nNOTICE: the kit is for building prototypes, do not use it for production services.')

// start the app
utils.findAvailablePort(app, function (port) {
  console.log('Listening on port ' + port + '   url: http://localhost:' + port)
  if (env === 'production') {
    app.listen(port)
  } else {
    app.listen(port - 50, function () {
      browserSync({
        proxy: 'localhost:' + (port - 50),
        port: port,
        ui: false,
        files: ['public/**/*.*', 'app/views/**/*.*'],
        ghostmode: false,
        open: false,
        notify: false,
        logLevel: 'error'
      })
    })
  }
})
