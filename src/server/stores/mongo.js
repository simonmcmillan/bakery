import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.connect('mongodb://127.0.0.1/graphql-demo');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected!');
});

export default mongoose;
