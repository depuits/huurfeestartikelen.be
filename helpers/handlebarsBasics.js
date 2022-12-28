module.exports = {
	/* eslint-disable-next-line eqeqeq */
	if_eq: (a, b, opts) => (a == b ? opts.fn(this) : opts.inverse(this)),
	class_for_first: (col, i, cls) => {
		if (i === 0) {
			return cls;
		}

		return '';
	},
	class_for_last: (col, i, cls) => {
		if (i === col.length - 1) {
			return cls;
		}

		return '';
	},
	class_first_or_last: (col, i, first, last) => {
		if (i === 0) {
			return first;
		}

		if (i === col.length - 1) {
			return last;
		}

		return '';
	},
	get_current_year: () => new Date().getFullYear(),
	date_string: date => {
		const opt = {
			// dateStyle: 'long',
			day: '2-digit',
			weekday: 'short',
			month: 'short',
			year: 'numeric',
		};

		return date.toLocaleString('nl-BE', opt);
		// return date.toDateString(); //TODO add formatting according to local or config
	},
	class_from_tags_joeri_elien: tags => {
		const hasJoeri = tags.includes('joeri');
		const hasElien = tags.includes('elien');

		if (hasJoeri && !hasElien) {
			return 'day--left';
		}

		if (!hasJoeri && hasElien) {
			return 'day--right';
		}

		return '';
	},
};
