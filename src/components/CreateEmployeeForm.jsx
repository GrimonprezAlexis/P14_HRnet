import React, { useState }  from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { POST_EMPLOYEE } from "../store/actions/constant";

import CustomDropdown from "agr-custom-dropdown";
import Modal from "agr-custom-modal";

import useEmployeeStorage from "./EmployeeStorage";


const CreateEmployeeForm = ({ statesUSA, departments }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { saveEmployee } = useEmployeeStorage();


    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = useState("Employee Created!");

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedStatesUSA, setSelectedStatesUSA] = useState(null);

    const [forceRequired, setForceRequired] = useState(false);

    const [startDate, setStartDate] = useState("");
    const [birthDate, setBirthdayDate] = useState("");

    const handleBirthDateChange = (e) => {
        setBirthdayDate(convertDateToString(e.target.valueAsDate));
    };

    const handleStartDateChange = (e) => {
        setStartDate(convertDateToString(e.target.valueAsDate));
    };

    const convertDateToString = (date) => {
        const dateString = date.toISOString().split('T')[0];
        return dateString;
    };

    const formatToDDMMYYYY = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }

    const onSubmit = async (e) => {
        if (!selectedDepartment) {
            setForceRequired(true);
        } else {
            let newEmployee = {
                firstName: e.firstName,
                lastName: e.lastName,
                dateOfBirth: formatToDDMMYYYY(birthDate),
                startDate: formatToDDMMYYYY(startDate),
                department: selectedDepartment?.label,
                street: e.street,
                city: e.city,
                state: selectedStatesUSA.label,
                zipCode: e.zipCode,
            }

            dispatch({
                type: POST_EMPLOYEE,
                payload: newEmployee,
            });

            const updatedEmployees = saveEmployee(newEmployee);

            setModalTitle("Employee Created!");
            setIsModalOpen(true);

            console.log("updatedEmployees", updatedEmployees);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false)
    };

    return (
        <>
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
                    <input
                        id="dateOfBirth"
                        type="date"
                        name="birthDate"
                        value={birthDate}
                        onChange={handleBirthDateChange}
                    />

                    <label htmlFor="startDate">Start Date</label>
                    <input
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />

                    <div className="departement">
                        <label htmlFor="department">Department *</label>
                        <CustomDropdown
                            options={departments} 
                            onChange={(e) => setSelectedDepartment(e)}
                            forceRequired={forceRequired}
                        />
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
                        <CustomDropdown
                            options={statesUSA} 
                            onChange={(e) => setSelectedStatesUSA(e)}
                        />

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


        <Modal
            title={modalTitle}
            isOpen={isModalOpen}
            onClose={handleModalClose}
        >
        </Modal>

        </>
    )
}



export default CreateEmployeeForm;