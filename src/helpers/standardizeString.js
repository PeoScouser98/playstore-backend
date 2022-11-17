const standardizeString = (str) => {
	const result = str.trim();
	while (result.indexOf("  ") != -1) {
		result.replace("  ", " ");
	}
	return result;
};

export default standardizeString;
