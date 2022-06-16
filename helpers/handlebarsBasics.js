module.exports = {
	if_eq: function(a, b, opts) {
		return (a == b) ? opts.fn(this) : opts.inverse(this);
	},
	class_for_first: function(col, i, cls) {
		if (i == 0) {
			return cls;
		}

		return '';
	},
	class_for_last: function(col, i, cls) {
		if (i == col.length-1) {
			return cls;
		}

		return '';
	},
	class_first_or_last: function(col, i, first, last) {
		if (i == 0) {
			return first;
		}

		if (i == col.length-1) {
			return last;
		}

		return '';
	},
	get_current_year: function() {
		return new Date().getFullYear();
	},
	date_string: function(date) {
		var opt = {
			//dateStyle: 'long',
			day: '2-digit',
			weekday: 'short',
			month: 'short',
			year: 'numeric',
		};

		return date.toLocaleString("nl-BE", opt);
		//return date.toDateString(); //TODO add formatting according to local or config
	},
	class_from_tags_joeri_elien: function(tags) {
		let hasJoeri = tags.includes('joeri');
		let hasElien = tags.includes('elien');

		if (hasJoeri && !hasElien) {
			return 'day--left';
		}

		if (!hasJoeri && hasElien) {
			return 'day--right';
		}

		return '';
	},
};
