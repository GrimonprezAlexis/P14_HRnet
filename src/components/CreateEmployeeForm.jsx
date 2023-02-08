import React, { useState }  from "react"
import { useForm } from "react-hook-form";

const CreateEmployeeForm = () => {


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

	const [showModal, setShowModal] = useState(false);
	const [jsonStatesUSA, setJsonStatesUSA] = useState([]);


    const onSubmit = async e => {
        const employeeData = {
            firstName: e.firstName,
            lastName: e.lastName,
            //dateOfBirth: moment(e.dateOfBirth).format('DD/MM/YYYY'),
            //startDate: moment(e.startDate).format('DD/MM/YYYY'),
            department: e.department,
            street: e.street,
            city: e.city,
            state: e.state,
            zipCode: e.zipCode
        };
        setShowModal(true);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="create-employee">
            <div className="formContainer">
                <div id="formText">
                    <label htmlFor="firstName">First Name *</label>
                    <input type="text" id="firstName" placeholder="First name"
                        {...register("firstName", {
                            required: true
                        })}
                    />
                    {errors.firstName ? errors.firstName.type === "required" && <p className="bgWarning">This field is required</p> : ''}

                    <label htmlFor="lastName">Last Name *</label>
                    <input type="text" id="lastName" placeholder="Last name" {...register("lastName", {
                        required: true
                    })}/>
                    {errors.lastName ? errors.lastName.type === "required" && <p className="bgWarning">This field is required</p> : ''}

                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input id="dateOfBirth" type="date" />

                    <label htmlFor="startDate">Start Date</label>
                    <input id="startDate" type="date" />

                    <div className="departement">
                        <label htmlFor="department">Department *</label>
                        <select name="department" id="department" {...register("department")}>
                            <option disabled>-- Select option --</option>
                            <option>Sales</option>
                            <option>Marketing</option>
                            <option>Engineering</option>
                            <option>Human Resources</option>
                            <option>Legal</option>
                        </select>
                    </div>
                </div>
                
                <fieldset id="formAddress">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" 
                        {...register("street", {
                                required: false
                        })} />

                        <label htmlFor="city">City</label>
                        <input id="city" type="text" 
                        {...register("city", {
                                required: false
                        })}/>

                        <label htmlFor="state">State</label>
                        <select name="state" id="state" {...register("state")}>
                            <option disabled>-- Select state --</option>
                        {
                            jsonStatesUSA && jsonStatesUSA.length > 0 && jsonStatesUSA.map((item) => <option key={item.name}>{item.name}</option>) 

                        }
                        </select>

                        <label htmlFor="zipCode">Zip Code</label>
                        <input id="zipCode" type="number" 
                        {...register("zipCode", {
                                required: false
                        })} />
                </fieldset>
            </div>

            <div className="formAction">
                <input type="submit" value="Save"/>
            </div>                
        </form>
    )
}

export default CreateEmployeeForm;