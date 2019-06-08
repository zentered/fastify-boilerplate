module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'GET',
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
        [httpStatus.OK]: { $ref: '/responses.json#/definitions/company' },
        [httpStatus.NOT_FOUND]: { $ref: '/responses.json#/definitions/error' }
      }
    },
    preHandler: async (request, reply) => {
      reply.ok(data)
    }
  })
  next()
}
