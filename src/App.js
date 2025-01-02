import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./Map"; 
import CountryDetails from "./CountryDetails"; 
import Login from "./Login";
import Register from "./Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/country/:id" element={<CountryDetails />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

      </Routes>
    </Router>
  );
};

export default App;
