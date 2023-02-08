import { useState } from "react";
import { Route } from "react-router-dom";

import { Outlet, Routes } from "react-router-dom"

import Header from "./components/Header";

import Modal from 'agr-custom-modal';

import Error404 from "./pages/404";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import CurrentEmployeesPage from "./pages/CurrentEmployeesPage";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app">

      <div>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        <Modal
          title="Employee Created!"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <p>This is the content of the modal.</p>
        </Modal>
      </div>

      {isModalOpen && (
        <Modal
          title="Employee Created!"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <p>This is the content of the modal.</p>
        </Modal>
      )}
      <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={
          <CreateEmployeePage 
            handleSubmit={createEmployee}
            handleOpenModal={handleOpenModal}
          />} 
        />
        <Route path="list" element={
          <CurrentEmployeesPage
            employeesList={employees}
          />} 
        />
        <Route path="*" element={<Error404 />} />
      </Route>
      </Routes>
    </div>




  )
};

export default App
