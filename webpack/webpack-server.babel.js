export default {

	entry: {
		server: `${process.cwd()}/src/server/index.js`
	},

	output: {
		path: `${process.cwd()}/lib/server`,
		filename: '[name]-[hash].js',
		libraryTarget: 'commonjs2'
	},

	target: 'node',

	module: {
		loaders: [
			{
				test: /\.js(x)?$/,
				loader: 'babel'
			}
		]
	},

	// Exclude all non-relative modules
	externals: /^[a-z\-0-9]+$/
};
