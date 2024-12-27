import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./Map"; 
import CountryDetails from "./CountryDetails"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/country/:id" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
