const httpStatus = require('http-status-codes')
const SchemaGenerator = require('../../schemas/generator')

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Companies'],
      params: {},
      querystring: 'pagination#',
      response: {
        [httpStatus.OK]: SchemaGenerator.paginatedResponse(
          '/responses.json#/definitions/company'
        )
      }
    },
    preHandler: async (request, reply) => {
      return reply.paginate([], 0, 0)
    }
  })
  next()
}
