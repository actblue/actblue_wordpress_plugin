export default ({ url, ...query }) => {
	const queryParams = [];

	Object.keys(query).map((key) => {
		if (query[key]) {
			queryParams.push(
				`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
			);
		}
	});

	const queryString = queryParams.length ? queryParams.join("&") : false;

	if (url && queryString) {
		return `${url}?${queryString}`;
	}
	return url;
};
