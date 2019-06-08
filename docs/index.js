module.exports = {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: process.env.TITLE,
      description: '',
      version: ''
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'Bearer',
        in: 'header'
      }
    },
    definitions: {}
  }
}
