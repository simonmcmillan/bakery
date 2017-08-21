import convict from 'convict';

const conf = convict({
	port: {
		doc: 'The port to bind.',
		format: 'port',
		default: 3000,
		env: 'PORT',
	},
	env: {
		doc: 'The applicaton environment.',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV',
	},
});

conf.validate({ strict: true });

export default conf;
