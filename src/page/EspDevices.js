import "../App.css";
import { useEffect, useState } from "react";
import * as React from "react";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import { Link } from "@mui/material";

import Tooltip from "@mui/material/Tooltip";

import Table from "../components/Table";
const API = "http://localhost:3003/esp";

export default function EspDevices() {
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
    fetchEsp(API);
    const interval = setInterval(() => {
      fetchEsp(API);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Container maxWidth="xl" sx={{ mx: "auto", mt: 2 }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            height: "5vh",
          }}
        >
          <IconButton sx={{ p: "15px" }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "15px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <Tooltip title="Add ESP Device" arrow>
            <Link href={"/add/esp"}>
              <IconButton
                color="primary"
                sx={{ p: "15px" }}
                aria-label="directions"
              >
                <ControlPointIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Paper>
        <Divider />
        <Table rows={data} />
      </Container>
    </div>
  );
}
