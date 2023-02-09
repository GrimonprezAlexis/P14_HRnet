import React, { useState }  from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { POST_EMPLOYEE, TOGGLE_MODAL } from "../store/actions/constant";

import { statesUSA, departments } from "../json/data";
import CustomDropdown from "agr-custom-dropdown";

const CreateEmployeeForm = () => {
	const [jsonStatesUSA, setJsonStatesUSA] = useState([]);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


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

        dispatch({
            type: POST_EMPLOYEE,
            payload: employeeData
        });
        handleOpenModal(true);
    }

    const handleOpenModal = (isModalOpen) => {
        dispatch({
          type: TOGGLE_MODAL,
          payload: isModalOpen
        });  
      };


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
                    {errors.firstName ? errors.firstName.type === "required" && <p className="bgWarning">First name is required</p> : ''}

                    <label htmlFor="lastName">Last Name *</label>
                    <input type="text" id="lastName" placeholder="Last name" {...register("lastName", {
                        required: true
                    })}/>
                    {errors.lastName ? errors.lastName.type === "required" && <p className="bgWarning">Last name is required</p> : ''}

                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input id="dateOfBirth" type="date" />

                    <label htmlFor="startDate">Start Date</label>
                    <input id="startDate" type="date" />

                    <div className="departement">
                        <label htmlFor="department">Department *</label>
                        <CustomDropdown
                            required={true}
                            options={departments} 
                            onChange={(selectedOption) => console.log(selectedOption)}
                        />

                        {/* <select name="department" id="department" {...register("department")}>
                            <option disabled>-- Select option --</option>
                            <option>Sales</option>
                            <option>Marketing</option>
                            <option>Engineering</option>
                            <option>Human Resources</option>
                            <option>Legal</option>
                        </select> */}
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

            <div id="formAction">
                <input type="submit" value="Save"/>
            </div>                
        </form>
    )
}

export default CreateEmployeeForm;