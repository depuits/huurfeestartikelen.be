const assert = require('assert');
const { describe, it } = require('mocha');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const sitePath = path.join(__dirname, 'build');

describe('rentshop root', () => {
	it('build should have key files', () => {
		const sitePaths = [path.join(sitePath, 'index.html')];

		sitePaths.forEach(filePath => {
			assert.doesNotThrow(() => {
				fs.accessSync(filePath);
			});
		});
	});

	it('index.html should have key elements', () => {
		const indexContent = fs.readFileSync(path.join(sitePath, 'index.html')).toString();
		const $ = cheerio.load(indexContent);

		assert.strictEqual($('title')[0].children[0].data, 'Zay Shop eCommerce HTML CSS Template');
	});
});
