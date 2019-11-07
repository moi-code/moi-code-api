const path = require('path');
// const server = require('express')();
const fs = require('fs');
module.exports = function core(server) {
	fs.readdir(path.join(__dirname, '/routes'), (err, files) => {
		if (files.length > 0) {
			files.forEach(file => {
				// Gets files from route directory, and inits
				server.use(`/api/${file}`, require(`./routes/${file}/index.js`));
			});
		} else {
			console.log('No Routes...');
		}
	});
};
