require('@babel/polyfill');
const dotenv = require('dotenv');
const express = require('express');
const next = require('next');
const cors = require('cors');
const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== 'production';
let app;

if (process.env.NODE_ENV !== 'backend') {
	app = next({ dev });

	const handle = app.getRequestHandler();
	let server = express();

	dotenv.config();
	app.prepare().then(() => {
		server.use(
			bodyParser.urlencoded({
				extended: false
			})
		);
		server.use(bodyParser.json());
		server.use(cors());
		/**
		 * @description Routes Used for the Project must come before the core.
		 */
		require('./api/auth')(app, server);
		require('./api/about')(app, server);
		/**
		 * @protected - Do not remove
		 * @requires Core
		 * @description This is the Core of the Project rendering the Homepage, Handling Get Requests, and starting the express server
		 */
		require('./core')(app, server);
	});
} else {
	app = express();
	server = app;
	require('./core')(app, server);
	require('./api/auth')(app, server);
	require('./api/about')(app, server);
}
