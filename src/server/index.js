import { Server } from 'http';
import app from './app';
import config from './config';

function createServer () {
	const http = Server(app);
	const port = config.get('port');
	let currentApp = app;

	http.listen(port, (err) => {
		if (err) {
			console.log('Server error');
			return void(0);
		}
		console.log('server listening on port %s', port);
	});

	//hot module reload
	if (module.hot) {
		module.hot.accept('./app', () => {
			server.removeListener('request', currentApp)
			server.on('request', app)
			currentApp = app
		})
	}

}


export default createServer;
