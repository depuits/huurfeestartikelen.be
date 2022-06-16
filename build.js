const sugar = require('metalsmith-sugar')({
	metalsmith: require("metalsmith"),
	metadata: {
		site: {
			title: 'RentShop',
			description: 'Website to rent stuff.',
			url: 'https://www.bok19.net/rentshop/',
		},
	},
});

const collections = require('@metalsmith/collections');

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
			}, {
				name: 'rotate',
			},
		]
	})

	.use('@metalsmith/drafts')
	.use('@metalsmith/markdown')
	.use(collections({
		items: {
			pattern: 'items/*',
		},
	}))

	//.use('metalsmith-register-helpers')
	.use('metalsmith-handlebars-x', {
		helpers: require('./helpers/handlebarsBasics.js')
	})

	//.use('@metalsmith/in-place')

	// root path is use in layouts
	.use('metalsmith-rootpath')

/*	.use('@metalsmith/layouts', {
		default: 'item.hbs',
		pattern: 'items/*.html',
	})*/

	//.use('@metalsmith/layouts')
	.use('metalsmith-native-lazy-loading', { selector: 'article' })

	.use('metalsmith-debug')
	.use('debug') // metalsmith-native-lazy-loading uses debug instead of metalsmith-debug

	.build();
