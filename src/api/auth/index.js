module.exports = (app,server) => {
	/**
	 * @route GET api/test
	 * @desc TESTS USERS ROUTE
	 * @access Public
	 */
	server.get('/api/auth/test', (req, res) => {
		res.json({
			msg: 'Auth 2 Works'
		});
		console.log('kappa');
  });
  server.get('/api/auth/register', (req, res) => {
		res.json({
			msg: 'Register'
		});
		console.log('kappa');
	});
};
