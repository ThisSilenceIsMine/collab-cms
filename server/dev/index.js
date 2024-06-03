import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import Gun from 'gun';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
	const app = express();
	const port = 8765;

	const vite = await createViteServer({
		server: { middlewareMode: true },
		appType: 'custom'
	});

	app.use(vite.middlewares);
	app.use(Gun.serve);

	app.use('*', async (req, res, next) => {
		const url = req.originalUrl;

		try {
			let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

			// Apply Vite HTML transforms.
			template = await vite.transformIndexHtml(url, template);

			const { render } = await vite.ssrLoadModule('/src/entry-server.js');

			const appHtml = await render(url);

			const html = template.replace(`<!--ssr-outlet-->`, appHtml);

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			vite.ssrFixStacktrace(e);
			next(e);
		}
	});

	const server = app.listen(port, '127.0.0.1');
	console.log('Server started on port ' + port + ' with /gun');

	var gun = Gun({ file: 'data', web: server });

	gun.user().create('root', 'tooramognus1488', (ack) => {
		if ('ok' in ack) {
			console.log('root user set up!');
		} else {
			console.log('failed to create root user');
		}
	});

	global.Gun = Gun;
	global.gun = gun;
}

createServer();
