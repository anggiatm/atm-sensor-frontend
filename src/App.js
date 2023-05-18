import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import EspData from "./components/EspData";
import { useQuery } from "react-query";
import axios from "axios";

import Navbar from "./components/Navbar";

import Table from "./components/Table";

const API = "http://localhost:3003/esp";

function App() {
  const [data, setData] = useState([]);
  const fetchEsp = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.length > 0) {
        setData(data);
      }
      // console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEsp(API);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Table rows={data} />
        </Container>
      </React.Fragment>
    </>
  );
}

export default App;
