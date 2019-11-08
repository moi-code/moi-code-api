module.exports = (app, server) => {
	server.get('/about/:about', (req, res) => {
		res.json({appa:'jdsad'})
		return app.render(req, res, '/about', { about: req.params.about });
	});
	server.get('/about/*', (req, res) => {
		res.json({ appa: 'jdsad' });
		return app.render(req, res, '/about');
	});
};
