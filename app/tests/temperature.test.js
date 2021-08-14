import { convert } from '../service/TemperatureService'

describe('C to F', () => {
	it.each([
		[-40, 'C', '-40.00', 'F'],
		[0, 'C', '32.00', 'F'],
		[100, 'C', '212.00', 'F'],
		[-17.22, 'C', '1.00', 'F'],
		[-273.15, 'C', '-459.67', 'F']
	])('case: test without passing precision param', (value, unit, new_value, new_unit) => {
		let actual = convert(value, unit)
		expect(actual).toEqual(expect.objectContaining({ unit: new_unit, value: new_value }))
	})
	it.each([
		[-40, 'C', '-40.00000', 'F', 5],
		[12.13, 'C', '53.8340', 'F', 4],
		[1.24, 'C', '34.232', 'F', 3],
		[-1.24, 'C', '29.77', 'F', 2],
		[1.24, 'C', '34.2', 'F', 1]
	])('case: test with precision param', (value, unit, new_value, new_unit, precision) => {
		let actual = convert(value, unit, precision)
		expect(actual).toEqual(expect.objectContaining({ unit: new_unit, value: new_value }))
	})
})

describe('F to C', () => {
	it.each([
		['-40.00', 'C', -40, 'F'],
		['0.00', 'C', 32, 'F'],
		['100.00', 'C', 212, 'F'],
		['-17.22', 'C', 1, 'F'],
		['-273.15', 'C', -459.67, 'F']
	])('case: test without passing precision param', (new_value, new_unit, value, unit) => {
		let actual = convert(value, unit)
		expect(actual).toEqual(expect.objectContaining({ unit: new_unit, value: new_value }))
	})
	it.each([
		['100.55556', 'C', 213, 'F', 5],
		['-19.0556', 'C', -2.3, 'F', 4],
		['1.240', 'C', 34.232, 'F', 3],
		['-1.24', 'C', 29.77, 'F', 2],
		['1.2', 'C', 34.2, 'F', 1]
	])('case: test with precision param', (new_value, new_unit, value, unit, precision) => {
		let actual = convert(value, unit, precision)
		expect(actual).toEqual(expect.objectContaining({ unit: new_unit, value: new_value }))
	})
})

describe('negative scenario', () => {
	it('case: invalid unit', () => {
		let actual = convert(1, 'cF')
		expect(actual).toEqual(expect.objectContaining({ code: 'UNIT NOT FOUND', data: { unit: 'CF' } }))
	})
})
