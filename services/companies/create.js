const uuid = require('uuid/v4')

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['Companies'],
      body: { $ref: '/requests.json#/definitions/company' },
      response: {
        [httpStatus.CREATED]: {
          $ref: '/responses.json#/definitions/company'
        },
        [httpStatus.CONFLICT]: {
          $ref: '/responses.json#/definitions/error'
        },
        [httpStatus.UNAUTHORIZED]: {
          $ref: '/responses.json#/definitions/error'
        }
      }
    },
    preHandler: async (request, reply) => {
      return reply.created({})
    }
  })
  next()
}
