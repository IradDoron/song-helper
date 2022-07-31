function getDifferentRandomNumber(currNumber, min, max) {
	let newNumber = currNumber;
	if (min === max) {
		return min;
	} else {
		while (newNumber === currNumber) {
			newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}

	return newNumber;
}

export default getDifferentRandomNumber;
