export default function bakeryError (message, code) {
	const err = new Error('There was an error');
	err.errors = message;
	err.status = code;

	return err;
}
