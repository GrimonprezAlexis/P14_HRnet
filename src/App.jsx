import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_MODAL } from "./store/actions/constant";

import Modal from 'agr-custom-modal';
import CustomDropdown from 'agr-custom-dropdown';

import Header from "./components/Header";


import Error404 from "./pages/404";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import CurrentEmployeesPage from "./pages/CurrentEmployeesPage";

const App = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector(state => state.isModalOpen );

  const handleCloseModal = () => {
    dispatch({
      type: TOGGLE_MODAL,
      payload: false
    });
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <div className="app">
      <CustomDropdown options={options} />


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
            <CreateEmployeePage />} 
          />
          <Route path="list" element={
            <CurrentEmployeesPage />} 
          />
          <Route path="*" element={<Error404 />} />
        </Route>
        </Routes>
    </div>




  )
};

export default App
