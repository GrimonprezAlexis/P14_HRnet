import { useSelector } from "react-redux";

const useEmployeeStorage = () => {
  const employees = useSelector((state) => state.data.employees);

  const saveEmployee = (employee) => {
    const updatedEmployees = [...employees, employee];
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    return updatedEmployees;
  };

  return { saveEmployee };
};

export default useEmployeeStorage;