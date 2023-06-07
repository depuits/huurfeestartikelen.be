const assert = require('assert');
const { describe, it } = require('mocha');
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
});
