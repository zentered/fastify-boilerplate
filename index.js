const config = require('./config')
const fastify = require('./app')

fastify.listen(config.port, config.host, err => {
  if (err) {
    fastify.log.error(err)
    throw err
  }

  fastify.swagger()
})
