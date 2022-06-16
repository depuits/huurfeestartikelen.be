const assert = require('assert');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const sitePath = path.join(__dirname, 'build');

describe('phototimeline root', () => {
	it('build should have key files', () => {
		const sitePaths = [
			path.join(sitePath, 'index.html'),
			path.join(sitePath, 'items.html'),
			path.join(sitePath, 'noah.html'),
		];

		sitePaths.forEach(filePath => {
			assert.doesNotThrow(() => {
				fs.accessSync(filePath);
			});
		});
	});

	/*it('index.html should have key elements', () => {
		const indexContent = fs.readFileSync(path.join(sitePath, 'index.html')).toString();
		const $ = cheerio.load(indexContent);

		assert.strictEqual($('title')[0].children[0].data, 'title name');
	});*/
});
