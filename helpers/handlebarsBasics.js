const myformat = new Intl.NumberFormat('nl-BE', {
	minimumFractionDigits: 2,
});

module.exports = {
	/* eslint-disable-next-line eqeqeq */
	if_eq: (a, b, opts) => (a == b ? opts.fn(this) : opts.inverse(this)),

	get_current_year: () => new Date().getFullYear(),

	format_price: num => myformat.format(num),
	first: arr => (arr || [])[0],

	remove_whitespace: str => (str || '').replace(/\s+/g, ''),

	is_xth_item: (index, x, opts) => (index % x === 0 ? opts.fn(this) : opts.inverse(this)),

	is_first: (col, i, opts) => (i === 0 ? opts.fn(this) : opts.inverse(this)),
	is_last: (col, i, opts) => (i === col.length - 1 ? opts.fn(this) : opts.inverse(this)),
};
