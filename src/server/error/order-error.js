export default function bakeryError (message, code) {
	const err = new Error(message);
	err.errors = message;
	err.status = code;

	return err;
}
