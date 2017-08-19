const env = process.env.NODE_ENV;

if (env === 'development' || env === 'test') {
	require('babel-register');
}

const createServer = require('./src/server/index.js').default;
const server = createServer();

module.exports = server;
