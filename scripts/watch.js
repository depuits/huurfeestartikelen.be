/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const browserSync = require('browser-sync');
const chokidar = require('chokidar');
const build = require('../build');

(async function firstRun() {
	await build();
	chokidar
		.watch(['src', 'assets', 'layouts'], {
			ignoreInitial: true,
			awaitWriteFinish: { pollInterval: 1000 },
		})
		.on('ready', () => {
			browserSync.init({
				host: 'localhost',
				server: './build',
				port: 3000,
				injectChanges: false,
				reloadThrottle: 0,
			});
			console.log('Initializing browser-sync...');
		})
		.on('all', async () => {
			await build();
			browserSync.reload();
		});
})();
