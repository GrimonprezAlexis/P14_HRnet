import React, { useState } from "react";
import PropTypes from 'prop-types';

import CreateEmployeeForm from "../components/CreateEmployeeForm";

const CreateEmployeePage = () => {
	const title = 'Create Employee'

	return (
		<>
        <section className="container">
		    <h1>{title}</h1>
            <CreateEmployeeForm/>
        </section>
		</>
	)
}

export default CreateEmployeePage