import React, { useState }  from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { POST_EMPLOYEE } from "../store/actions/constant";

import CustomDropdown from "agr-custom-dropdown";
import Modal from "agr-custom-modal";

import { statesUSA, departments } from "../json/data";

const CreateEmployeeForm = () => {
    const [birthdate, setBirthdate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const defaultModalTitle = "Employee Created!";
    const [modalTitle, setModalTitle] = useState(defaultModalTitle);
    const [isModalOpen, setIsOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showRequiredMessage, setShowRequiredMessage] = useState(false);

    const dispatch = useDispatch();


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async e => {

        if(!selectedDepartment) {
            setIsOpenModal(true);
            setShowRequiredMessage(true);
            setErrorMessage("Please select a department");
            setModalTitle("Error!")
        } else {
            setShowRequiredMessage(false);
            setModalTitle(defaultModalTitle);
        }

        const employeeData = {
            firstName: e.firstName,
            lastName: e.lastName,
            dateOfBirth: formatDate(e.dateOfBirth),
            tartDate: formatDate(e.startDate),
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

        handleToggleModal(true);
    }

    const handleToggleModal = (isModalOpen) => {
        setIsOpenModal(isModalOpen)
    };

    const handleChangeDate = (event) => {
        setBirthdate(event.target.value);
    };
    const handleChangeStartDate = (event) => {
        setStartDate(event.target.value);
    };

    // Format date to DD/MM/YYYY
    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
      
        if (month.length < 2) {
          month = '0' + month;
        }
        if (day.length < 2) {
          day = '0' + day;
        }
        return [day, month, year].join('/');
    };

    
    // Save employee data in local storage after dispatch
    const employeeForLocalStorage = useSelector(state => state.data.employees);
    localStorage.setItem('employees', JSON.stringify(employeeForLocalStorage));


    return (
        <>
        {isModalOpen && (
            <Modal
            title={modalTitle}
            isOpen={isModalOpen}
            onClose={handleToggleModal(false)}
            >
            <p>{errorMessage}</p>
            </Modal>
        )}

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
                    <input type="date" value={birthdate} onChange={handleChangeDate} />

                    <label htmlFor="startDate">Start Date</label>
                    <input type="date" value={startDate} onChange={handleChangeStartDate} />

                    <div className="departement">
                        <label htmlFor="department">Department *</label>
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
        </>

    )
}

export default CreateEmployeeForm;