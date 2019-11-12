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
    organizations(last: 4) {
      edges {
        node {
          name
					url
        }
      }
    }
    starredRepositories(last: 7) {
      edges {
        node {
          name
          url
        }
      }
    }
    watching(last: 7) {
      edges {
        node {
          name
          url
        }
      }
    }
  }
}

`;
		const v = `{
    }
		`;
		let resp;
		axios
			.post(
				'https://api.github.com/graphql',
				{ query: q, variables: v },
				config
			)
			.then(resp => {
				const queryParams = {
					githubData: resp.data.data.viewer
				};
				return ssrCache({ req, res, pagePath: '/github', queryParams });
			})
			.catch(err => {
				console.log('Error:', err);
				return ssrCache({ req, res, pagePath: '/github' });
			});
	});
};
