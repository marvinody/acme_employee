const employees = [
	{ id: 1, name: 'moe' },
	{ id: 2, name: 'larry', managerId: 1 },
	{ id: 4, name: 'shep', managerId: 2 },
	{ id: 3, name: 'curly', managerId: 1 },
	{ id: 5, name: 'groucho', managerId: 3 },
	{ id: 6, name: 'harpo', managerId: 5 },
	{ id: 8, name: 'shep Jr.', managerId: 4 },
	{ id: 99, name: 'lucy', managerId: 1 }
]

const spacer = (text) => {
	if (!text) {
		return console.log('')
	}
	const stars = new Array(5).fill('*').join('')
	console.log(`${stars} ${text} ${stars}`)
}

const findEmployeeByName = (name, db) => {
	return db.filter((el) => {
		return el.name === name ? el : ''
	})
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
let employee = findEmployeeByName('moe', employees)
console.log(employee)
//{ id: 1, name: 'moe' }

spacer('')

spacer('findManagerFor Shep')
const findManagerFor = (callback, db) => {
	return db.filter((el) => {
		return el.id === callback[0].managerId ? el : ''
	})
}

//given an employee and a list of employees, return the employee who is the manager
console.log(
	findManagerFor(findEmployeeByName('shep Jr.', employees), employees)
)
//{ id: 4, name: 'shep', managerId: 2 }

spacer('')

spacer('findCoworkersFor Larry')

const findCoworkersFor = (callback, db) => {
	let employee = callback[0]
	let employeeID = callback[0].id
	let data = db.filter((el) => {
		return el.managerId === employee.managerId && el.id !== employeeID
			? el
			: ''
	})
	console.log(data)
}
//given an employee and a list of employees, return the employees who report to the same manager
console.log(
	findCoworkersFor(findEmployeeByName('larry', employees), employees)
) /*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('')

const findManagementChainForEmployee = (callback, db) => {
	const manager = findManagerFor(callback, db)
	console.log(manager[0])
	if (manager[0]) {
		managementChain = findManagementChainForEmployee(manager[0], db)
		// console.log(managementChain);
		// managementChain.push(manager[0]);
		// return managementChain;
	}

	return []
}

spacer('')

spacer('findManagementChain for shep Jr.')
console.log(
	findManagementChainForEmployee(
		findEmployeeByName('shep Jr.', employees),
		employees
	)
) /*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('')
