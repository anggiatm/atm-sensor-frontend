import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import ResetButton from "./ResetButton";
import MenuButton from "./MenuButton";
import api from "../api";

import moment from "moment/moment";

import { red } from "@mui/material/colors";

const colorAlarm = red[200];
const colorAlarmHover = red[100];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 490,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicTable({ rows }) {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(selectedRow);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    handleOpen();
  };

  const handleEnableBuzzer = () => {
    const data = {
      id: selectedRow.id,
      buzzer: 1,
      reboot: 0,
    };
    api.post("/esp/command", data).then((response) => {
      console.log(response);
    });
  };

  const handleDisableBuzzer = () => {
    const data = {
      id: selectedRow.id,
      buzzer: 0,
      reboot: 0,
    };
    api.post("/esp/command", data).then((response) => {
      console.log(response);
    });
  };

  const handleReboot = () => {
    const data = {
      id: selectedRow.id,
      buzzer: 0,
      reboot: 1,
    };
    api.post("/esp/command", data).then((response) => {
      console.log(response);
    });
  };

  const handleEdit = () => {
    navigate(`/edit/${selectedRow.id}`);
    handleClose();
  };

  const tableRow = (row) => {
    const lastSeen = moment().diff(moment(row.last_update), "minutes");
    const lastUpdate = moment(row.last_update).format("hh:mm:ss DD:MM:YYYY");

    const styleDangerRow = {
      backgroundColor: colorAlarm,
      "&:last-child td, &:last-child th": { border: 0 },
      "&:hover": {
        color: "gray",
        backgroundColor: colorAlarmHover,
      },
    };

    const styleNormalRow = {
      "&:last-child td, &:last-child th": { border: 0 },
      "&:hover": {
        color: "gray",
        backgroundColor: "rgb(230, 230, 230)",
      },
    };

    return (
      <TableRow
        sx={row.alarm_state == 1 ? styleDangerRow : styleNormalRow}
        key={row.id}
        onClick={() => handleRowClick(row)}
      >
        <TableCell align="left">
          <strong>{row.id}</strong>
        </TableCell>
        <TableCell align="right">{row.mac_addr}</TableCell>
        <TableCell align="right">{row.publish_to}</TableCell>
        <TableCell align="right">
          {" "}
          <Box
            sx={{
              color: row.alarm_state ? "error.main" : "success.main",
            }}
          >
            {row.alarm_state ? "Alarm" : "Normal"}
          </Box>
        </TableCell>
        <TableCell align="right">
          <Box
            sx={{
              color: row.buzzer_state ? "success.main" : "warning.main",
            }}
          >
            {row.buzzer_state ? "Active" : "Inactive"}
          </Box>
        </TableCell>
        <TableCell align="right">{row.alarm_count}</TableCell>
        <TableCell align="right">{row.warn_count}</TableCell>
        <TableCell align="right">{row.temp}</TableCell>
        <TableCell align="right">{row.hum}</TableCell>
        <TableCell align="right">{row.accel_x}</TableCell>
        <TableCell align="right">{row.accel_y}</TableCell>
        <TableCell align="right">{row.accel_z}</TableCell>
        <TableCell align="right">{row.accel_all}</TableCell>
        <TableCell align="right">{lastUpdate}</TableCell>
        <TableCell align="right">
          <Box
            sx={{
              color: lastSeen < 10 ? "success.main" : "warning.main",
            }}
          >
            {lastSeen} min ago
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">MAC ADDR</TableCell>
              <TableCell align="center">PUBLISH TO</TableCell>
              <TableCell align="center">ALARM STATE</TableCell>
              <TableCell align="center">BUZZER STATE</TableCell>
              <TableCell align="center">ALARM COUNT</TableCell>
              <TableCell align="center">WARN COUNT</TableCell>
              <TableCell align="center">TEMP</TableCell>
              <TableCell align="center">HUMIDITY</TableCell>
              <TableCell align="center">ACCEL X</TableCell>
              <TableCell align="center">ACCEL Y</TableCell>
              <TableCell align="center">ACCEL Z</TableCell>
              <TableCell align="center">ACCEL ALL</TableCell>
              <TableCell align="center">LAST UPDATE</TableCell>
              <TableCell align="center">LAST SEEN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return tableRow(row);
              // return row.alarm_state == 1 ? redRow(row) : normalRow(row);
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
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
            DEVICE ID : {selectedRow.id}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Select action:
            <Stack direction="row" spacing={1}>
              <Button
                onClick={handleEnableBuzzer}
                variant="contained"
                color="primary"
                size="medium"
                // startIcon={<DeleteIcon />}
              >
                BUZZER ON
              </Button>
              <Button
                onClick={handleDisableBuzzer}
                variant="contained"
                color="primary"
                size="medium"
                // startIcon={<DeleteIcon />}
              >
                BUZZER OFF
              </Button>
              <Button
                onClick={handleReboot}
                variant="contained"
                color="error"
                size="medium"
                // startIcon={<DeleteIcon />}
              >
                REBOOT
              </Button>

              <Button
                onClick={handleEdit}
                variant="contained"
                color="primary"
                size="medium"
                // startIcon={<DeleteIcon />}
              >
                EDIT
              </Button>
            </Stack>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
