import "./App.css";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import EspDevices from "./page/EspDevices";
import EditEsp from "./page/EditEsp";
import AddEsp from "./page/AddEsp";

function App() {
  return (
    <>
      <Navbar />
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Routes>
            <Route exact path="/" element={<EspDevices />} />
            <Route path="/edit/:espId" element={<EditEsp />} />
            <Route path="/add/esp" element={<AddEsp />} />
          </Routes>
        </Router>
      </React.Fragment>
    </>
  );
}

export default App;
