/* eslint-disable import/no-extraneous-dependencies */

const metalsmith = require('metalsmith');
const metalsmithSugar = require('metalsmith-sugar');
const collections = require('@metalsmith/collections');
const handlebarsHelpers = require('./helpers/handlebarsBasics');

const isProduction = process.env.NODE_ENV === 'production';

function build() {
	const t1 = performance.now();

	const sugar = metalsmithSugar({
		metalsmith,
		metadata: {
			isProduction,
			site: {
				title: 'RentShop',
				description: 'Website to rent stuff.',
				url: isProduction ? 'https://www.bok19.net/rent/' : 'https://localhost:3000',
			},
		},
	});

	sugar
		.use('metalsmith-assets-improved', {
			dest: 'assets',
		})
		.use('@metalsmith/sass', {
			loadPaths: ['node_modules'],
		})

		// resize images
		.use('metalsmith-sharp', {
			methods: [
				{
					name: 'resize',
					args: {
						width: 800,
						height: 800,
						fit: 'inside',
					},
				},
				{
					name: 'rotate',
				},
			],
		})

		.use('@metalsmith/drafts')
		.use('@metalsmith/markdown')
		.use(
			collections({
				items: {
					pattern: 'items/*',
				},
			})
		)

		// .use('metalsmith-register-helpers')
		.use('metalsmith-handlebars-x', {
			helpers: handlebarsHelpers,
		})

		.use('@metalsmith/in-place')

		// root path is use in layouts
		.use('metalsmith-rootpath')

		/*
		.use('@metalsmith/layouts', {
			default: 'item.hbs',
			pattern: 'items/*.html',
		})
		*/

		.use('@metalsmith/layouts')
		.use('metalsmith-native-lazy-loading', { selector: 'article' })

		.use('metalsmith-debug')
		.use('debug') // metalsmith-native-lazy-loading uses debug instead of metalsmith-debug

		.build(err => {
			if (err) {
				throw err;
			}
			/* eslint-disable no-console */
			console.log(`Build success in ${((performance.now() - t1) / 1000).toFixed(1)}s`);
		});
}

if (require.main === module) {
	build();
} else {
	module.exports = build;
}
