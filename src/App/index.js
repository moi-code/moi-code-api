const express = require('express');
const initServer = require('../index');
const next = require('next');
const cors = require('cors');
const path = require('path');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

// Route to use
// app.use('(/api)?/auth', auth);
console.log(initServer);
function getServer(e) {
	return e;
}
module.exports = () => {
	app.prepare().then(() => {
		let server = express();
		server.use(cors());

		server.get('/', (req, res) => {
			return app.render(req, res, '/');
		});

		server.all('*', (req, res) => {
			return handle(req, res);
		});
		server.listen(port, err => {
			if (err) throw err;
			console.log(`> Ready on http://localhost:${port}`);
		});
	});
};
