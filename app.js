const path = require('path')
const AutoLoad = require('fastify-autoload')
const fastify = require('fastify')
const config = require('./config')
const onRequestHook = require('./hooks/on-request')
const httpErrors = require('./lib/http-errors')

const app = fastify({
  logger: {
    level: process.env.LOG_LEVEL
  }
})

/**
 * Server plugins, security etc.
 */

app.register(require('fastify-cors'), {})
app.use(require('dns-prefetch-control')())
app.use(require('frameguard')())
app.use(require('hide-powered-by')())
app.use(require('hsts')())
app.use(require('ienoopen')())
app.use(require('x-xss-protection')())
app.use(require('compression')())

/**
 * Custom plugins, middlewares etc.
 */
app.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  options: {}
})

/**
 * Hooks
 */
app.addHook('onRequest', onRequestHook)

/**
 * Schemas for validation, serialisation and swagger
 * https://json-schema.org
 */
app.addSchema(require('./schemas/definitions'))
app.addSchema(require('./schemas/requests'))
app.addSchema(require('./schemas/responses'))


/**
 * OpenAPI Docs (Swagger)
 */
app.register(require('fastify-swagger'), require('./docs'))
app.register(require('fastify-static'), {
  root: path.join(__dirname, 'schemas'),
  prefix: '/' // Optional: default '/'
})

/*
 * Error handler
 */
app.setErrorHandler(async (error, request, reply) => {
  if (reply.res.statusCode === 500) {
    if (config.isDebug) console.error(error)
    return reply.internalServerError()
  }

  return reply.send(error)
})

/**
 * Routes
 */
app.register(AutoLoad, {
  dir: path.join(__dirname, 'services'),
  options: {}
})

module.exports = app
