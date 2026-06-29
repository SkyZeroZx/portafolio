let handlerPromise;

module.exports = async (req, res) => {
	handlerPromise ??= import('../dist/portafolio/server/server.mjs').then((server) => server.reqHandler);
	const handler = await handlerPromise;

	return handler(req, res);
};
