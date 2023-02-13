import React from "react";
import CreateEmployeeForm from "../components/CreateEmployeeForm";

const CreateEmployeePage = () => {
	const title = 'Create Employee'

	return (
        <section className="container">
		    <h1>{title}</h1>
            <CreateEmployeeForm/>
        </section>
	)
}

export default CreateEmployeePage