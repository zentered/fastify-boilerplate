const httpStatus = require('http-status-codes')

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'DELETE',
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
      response: {
        [httpStatus.NO_CONTENT]: {
          $ref: '/responses.json#/definitions/noContent'
        },
        [httpStatus.NOT_FOUND]: {
          $ref: '/responses.json#/definitions/error'
        },
        [httpStatus.FORBIDDEN]: {
          $ref: '/responses.json#/definitions/error'
        },
        [httpStatus.INTERNAL_SERVER_ERROR]: {
          $ref: '/responses.json#/definitions/error'
        }
      }
    },
    preHandler: check(roles.atLeastAdmin),
    handler: async (request, reply) => {
      const deleteResult = await fastify
        .knex('companies')
        .where({ id: request.params.id })
        .delete()

      if (deleteResult === 0) return reply.notFound()
      if (deleteResult === 1) return reply.noContent()
      return reply.internalServerError()
    }
  })
  next()
}
