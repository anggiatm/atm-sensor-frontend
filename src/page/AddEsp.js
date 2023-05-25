import { useState } from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";

import Divider from "@mui/material/Divider";

import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import FirstPageIcon from "@mui/icons-material/FirstPage";

import DownloadDoneIcon from "@mui/icons-material/DownloadDone";

import api from "../api";

export default function AddEsp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    accel_all: "",
    accel_x: "",
    accel_y: "",
    accel_z: "",
    alarm_count: "",
    alarm_state: "",
    hum: "",
    last_update: "",
    mac_addr: "",
    publish_to: "",
    temp: "",
    warn_count: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    api.post("/esp", formData).then((response) => {
      console.log(response);

      navigate("/");
    });
  };
  return (
    <>
      <Box sx={{ width: "45vw", mx: "auto" }}>
        <Grid container spacing={2} sx={{ my: 3 }}>
          <Grid item xs={4}>
            <TextField
              id="outlined-controlled"
              name="id"
              label="ID"
              value={formData.id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-controlled"
              name="publish_to"
              label="Publish Topic"
              value={formData.publish_to}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-controlled"
              name="mac_addr"
              label="MAC Address"
              value={formData.mac_addr}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Divider />

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={4}>
            <TextField
              id="outlined-controlled"
              name="alarm_state"
              label="Alarm State"
              value={formData.alarm_state}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="outlined-controlled"
              name="temp"
              label="Temperature"
              value={formData.temp}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="outlined-controlled"
              name="accel_all"
              label="Acceleration All"
              value={formData.accel_all}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="outlined-controlled"
              name="alarm_count"
              label="Alarm Count"
              value={formData.alarm_count}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-controlled"
              name="hum"
              label="Humidity"
              value={formData.hum}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-controlled"
              name="accel_x"
              label="Acceleration X"
              value={formData.accel_x}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="outlined-controlled"
              name="warn_count"
              label="Warn Count"
              value={formData.warn_count}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-controlled"
              name="last_update"
              label="Last Update"
              value={formData.last_update}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-controlled"
              name="accel_y"
              label="Acceleration Y"
              value={formData.accel_y}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            {" "}
            <TextField
              id="outlined-controlled"
              name="accel_z"
              label="Acceleration Z"
              value={formData.accel_z}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<FirstPageIcon />}>
                Cancel
              </Button>
              <Button
                onClick={handleAdd}
                variant="contained"
                endIcon={<DownloadDoneIcon />}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
