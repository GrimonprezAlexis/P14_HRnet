import React from "react";
import CreateEmployeeForm from "../components/CreateEmployeeForm";
import { statesUSA, departments } from '../data';

const CreateEmployeePage = () => {
	return (
		<>
        <section className="container">
		    <h1>Create Employee</h1>
            <CreateEmployeeForm statesUSA={statesUSA} departments={departments}/>
        </section>
		</>
	)
}

export default CreateEmployeePage;