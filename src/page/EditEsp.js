import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";

import Stack from "@mui/material/Stack";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";

import { TextField } from "@mui/material";

import Divider from "@mui/material/Divider";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import api from "../api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditEsp() {
  const navigate = useNavigate();
  const { espId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState({});

  const [modalopen, setModalopen] = useState(false);
  const handleOpen = () => setModalopen(true);
  const handleClose = () => setModalopen(false);

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

  useEffect(() => {
    api
      .get(`esp/${espId}`)
      .then((response) => {
        setFormData((formData) => ({
          ...formData,
          ...response.data[0],
        }));
        // setData(response.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [espId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    api.delete(`/esp/${espId}`).then((response) => {
      console.log(response);
      handleClose();
      navigate("/");
    });
  };

  const handleUpdate = () => {
    // console.log(`/esp/${espId}`);
    api.put(`/esp/${espId}`, formData).then((response) => {
      console.log(response);
    });
  };

  // const inputChangeHandler = (e) => {
  //   setData((data) => ({
  //     ...data,
  //     ...{ id: e.target.value },
  //   }));
  //   // console.log(data);
  // };
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
              <Button
                onClick={handleOpen}
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button
                onClick={handleUpdate}
                variant="contained"
                endIcon={<DownloadDoneIcon />}
              >
                Update
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={modalopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Confirm Delete?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            <Stack direction="row" spacing={2}>
              <Button
                onClick={handleClose}
                variant="outlined"
                endIcon={<ClearIcon />}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Stack>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
