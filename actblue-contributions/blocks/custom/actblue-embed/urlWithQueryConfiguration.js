export default ({ url, refcode }) => {
	const queryParams = [];

	if (refcode) {
		queryParams.push(`refcode=${refcode}`);
	}

	const queryString = queryParams.length ? queryParams.join("&") : false;

	if (url && queryString) {
		return `${url}?${queryString}`;
	}
	return url;
};
