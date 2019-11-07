const express = require('express');
let server = express();
module.exports = () => {
	/**
	 * @route GET api/user/test
	 * @desc TESTS USERS ROUTE
	 * @access Public
	 */
	server.get('/test', (req, res) => {
		res.json({
			msg: 'Auth Works'
		});
	});
};
