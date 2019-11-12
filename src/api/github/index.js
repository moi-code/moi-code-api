const cacheableResponse = require('cacheable-response');
const axios = require('axios');
module.exports = (app, server) => {
  const ssrCache = cacheableResponse({
    ttl: 250 * 60 * 60, // 1hour
    get: async ({ req, res, pagePath, queryParams }) => ({
      data: await app.renderToHTML(req, res, pagePath, queryParams)
    }),
    send: ({ data, res }) => res.send(data)
  });


  /**
   * Gets Github Data Using API
   */
	server.get('/github', (req, res) => {

      return ssrCache({ req, res, pagePath: '/github' });
	});
};
