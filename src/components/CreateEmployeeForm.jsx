import React, { useState }  from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { POST_EMPLOYEE } from "../store/actions/constant";

import CustomDropdown from "agr-custom-dropdown";
import Modal from "agr-custom-modal";

const CreateEmployeeForm = ({ statesUSA, departments }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [modalTitle, setModalTitle] = useState("Employee Created!");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [startDate, setStartDate] = useState("");
    const [birthDate, setBirthdayDate] = useState("");

    const handleBirthDateChange = (e) => {
        setBirthdayDate(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleChangeDepartments = e => {
        console.log("e", e);
        setSelectedDepartment(e);
    };

    const onSubmit = async e => {
        if (!selectedDepartment) {
            setErrorMessage("Please select a department");
            setModalTitle("Error!");
            setIsModalOpen(true);
          } else {
            setModalTitle("Employee Created!");
            dispatch({ type: POST_EMPLOYEE, payload: {
                firstName: e.firstName,
                lastName: e.lastName,
                dateOfBirth: e.dateOfBirth,
                tartDate: e.startDate,
                department: e.department,
                street: e.street,
                city: e.city,
                state: e.state,
                zipCode: e.zipCode
            }});
            setIsModalOpen(true);
          }
    };

    const employeeForLocalStorage = useSelector(state => state.data.employees);
    localStorage.setItem('employees', JSON.stringify(employeeForLocalStorage));

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
                        type="date"
                        name="birthDate"
                        value={birthDate}
                        onChange={handleBirthDateChange}
                        {...register("birthDate", { required: false })}
                    />

                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={handleStartDateChange}
                        {...register("startDate", { required: false })}
                    />

                    <div className="departement">
                        <label htmlFor="department">Department *</label>
                        <CustomDropdown
                            options={departments} 
                            onChange={handleChangeDepartments}
                            forceRequired={true}
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
                            onChange={(selectedStates) => console.log(selectedStates)}
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


        {isModalOpen && (
        <Modal
            title={modalTitle}
            isOpen={isModalOpen}
            onClose={setIsModalOpen(false)}
            >
            <p>{errorMessage}</p>
        </Modal>
        )}
        </>
    )
}

export default CreateEmployeeForm;