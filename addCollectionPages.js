function addCollectionPages() {
	return (files, metalsmith, done) => {
		const { collections } = metalsmith.metadata();

		// Iterate over each collection
		Object.keys(collections).forEach(collectionName => {
			const collection = collections[collectionName];

			// Create a new page for the collection
			const page = {
				layout: 'collection.hbs', // Use your collection page template
				collectionName,
				collectionItems: collection,
			};

			// Generate a unique filename for the collection page
			const filename = `${collectionName}.html`;

			// Add the new page to the Metalsmith files
			/* eslint-disable no-param-reassign */
			files[filename] = {
				contents: Buffer.from(''), // Placeholder content, you can customize it if needed
				...page,
			};
		});

		done();
	};
}

module.exports = addCollectionPages;
