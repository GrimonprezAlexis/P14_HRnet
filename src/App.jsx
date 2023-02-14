import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";

import Error404 from "./pages/404";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import CurrentEmployeesPage from "./pages/CurrentEmployeesPage";

const App = () => {
  return (
    <div className="app">
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

export default App;
