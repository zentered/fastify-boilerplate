const config = require('../config')

module.exports.paginatedResponse = ref => ({
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        $ref: ref
      }
    },
    meta: {
      type: 'object',
      required: ['count', 'page', 'totalCount'],
      properties: {
        count: {type: 'number'},
        page: {type: 'number'},
        totalCount: {type: 'number'}
      }
    }
  }
})

module.exports.paginationParams = {
  page: {
    type: 'number',
    minimum: 0,
    default: config.pagination.defaultPage
  },
  count: {
    type: 'number',
    maximum: config.pagination.maxCount,
    minimum: 0,
    default: config.pagination.defaultCount
  }
}
