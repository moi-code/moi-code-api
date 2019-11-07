const express = require('express');
const initServer = require('../index');
const next = require('next');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== 'production';

const port = parseInt(process.env.PORT, 10) || 8989;

// Route to use
// app.use('(/api)?/auth', auth);
function getServer(e) {
	return e;
}
let server = express();
server.use(
	bodyParser.urlencoded({
		extended: false
	})
);
server.use(bodyParser.json());
module.exports = () => {
	if (process.env.NODE_ENV !== 'backend') {
		const app = next({ dev });
		const handle = app.getRequestHandler();
		app.prepare().then(() => {
			server.use(cors());
			require('../core')(server);
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
	} else {
		let server = express();

		server.use(cors());
		// server.use(require('../core'));
		require('../core')(server);
		server.get('/', (req, res) => {
			res.json({ test: 'works' });
		});
		server.listen(port, err => {
			if (err) throw err;
			console.log(`> Ready on http://localhost:${port}`);
		});
	}
};
