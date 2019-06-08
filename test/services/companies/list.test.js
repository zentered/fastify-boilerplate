const test = require('ava')
const fastify = require('../../../app')
const headers = require('../../headers')

test(`GET /companies should return only the company the user has access to`, async t => {
  const actual = await fastify.inject({
    method,
    url,
    headers: headers
  })

  t.is(actual.statusCode, 200)
  const body = JSON.parse(actual.payload)
})
