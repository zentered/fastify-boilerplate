const httpStatus = require('http-status-codes')

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: {
      tags: ['Companies'],
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          }
        }
      },
      body: { $ref: '/requests.json#/definitions/company' },
      response: {
        [httpStatus.OK]: { $ref: '/responses.json#/definitions/company' },
        [httpStatus.NOT_FOUND]: { $ref: '/responses.json#/definitions/error' },
        [httpStatus.FORBIDDEN]: {
          $ref: '/responses.json#/definitions/error'
        }
      }
    },
    preHandler: async (request, reply) => {
      reply.send('ok')
    }
  })
  next()
}
