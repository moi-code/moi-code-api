const ssrCache = require('./ssrCache')
const port = parseInt(process.env.PORT, 10) || 8989;

module.exports = function core(app, server) {
	if(process.env.NODE_ENV !=='backend'){
		const cacheableResponse = require('cacheable-response');
		const ssrCache = cacheableResponse({
			ttl: 250 * 60 * 60, // 1hour
			get: async ({ req, res, pagePath, queryParams }) => ({
				data: await app.renderToHTML(req, res, pagePath, queryParams)
			}),
			send: ({ data, res }) => res.send(data)
		});
		const handle = app.getRequestHandler();
		server.get('/', (req, res) => {
			return ssrCache({req, res, pagePath:'/'});
		});
	
		server.all('*', (req, res) => {
			return handle(req, res);
		});
	}

	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
};
