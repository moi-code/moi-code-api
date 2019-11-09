const axios = require('axios');
module.exports = (app, server) => {
	server.get('/github', (req, res) => {
		var config = {
			headers: { Authorization: 'bearer ' + process.env.GITHUB_TOKEN }
		};
		const q = `{
  viewer {
    login
    avatarUrl
    bio
    isHireable
    isBountyHunter
    organizations(first: 3) {
      edges {
        node {
          name
          description
        }
      }
    }
    starredRepositories(last: 3) {
      edges {
        node {
          name
          description
        }
      }
    }
    watching(last: 3) {
      edges {
        node {
          name
          description
        }
      }
    }
  }
}

`;
		const v = `{
    }
		`;
		let resp
		axios
			.post(
				'https://api.github.com/graphql',
				{ query: q, variables: v },
				config
			)
			.then(resp => {
				return app.render(req, res, '/github', {
					githubData: resp.data.data.viewer
				});
			})
			.catch(err => {
				console.log('Error:', err);
				return app.render(req, res, '/github');
			});
	});
};
