import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./Map"; 
import CountryDetails from "./CountryDetails"; 
import Login from "./Login";
import Register from "./Register";
import FileUpload from "./FileUpload";
import ViewFiles from "./ViewFiles";
import 'sweetalert2/dist/sweetalert2.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/country/:id" element={<CountryDetails />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/file-upload' element={<FileUpload/>} />
        <Route path='/view-file' element={<ViewFiles/>} />

      </Routes>
    </Router>
  );
};

export default App;
