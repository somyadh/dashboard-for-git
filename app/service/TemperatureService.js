export const convert = (value, unit, precision = 2) => {
	unit = unit.toUpperCase()
	const multiplier = 5 / 9
	let new_value, new_unit

	switch (unit) {
		case 'F':
			new_value = (value - 32) * multiplier
			new_unit = 'C'
			break
		case 'C':
			new_value = value / multiplier + 32
			new_unit = 'F'
			break
		default:
			return { code: 'UNIT NOT FOUND', data: { unit: unit } }
	}

	return { unit: new_unit, value: new_value.toFixed(precision)}
}
