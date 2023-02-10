import { useSelector } from "react-redux";

function CurrentEmployeesPage() {
	const employees = useSelector(state => state.data.employees) || localStorage.getItem('employees');

	const title = 'Welcome to Employee List Page';

	return (
		<>
		<h1>{title}</h1>
		<div>{employees.map(employee => 
		<>
			<p>{employee.firstName}</p>
			<p>{employee.lastName}</p>
			<p>{employee.department}</p>
			<p>{employee.street}</p>
			<p>{employee.city}</p>
			<p>{employee.state}</p>
			<p>{employee.zipCode}</p>
			<br></br>
		</>	
		)}</div>
		</>
	)
}

export default CurrentEmployeesPage;