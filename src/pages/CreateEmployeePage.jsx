import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreateEmployeeForm from "../components/CreateEmployeeForm";

import { statesUSA, departments } from "../json/data";

const CreateEmployeePage = () => {
	const title = 'Create Employee'

	return (
		<>
        <section className="container">
		    <h1>{title}</h1>


            <CreateEmployeeForm


            
            />
        </section>
		</>
	)
}

export default CreateEmployeePage