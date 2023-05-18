import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable({ rows }) {
  console.log(rows);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">MAC ADDR</TableCell>
            <TableCell align="right">PUBLISH TO</TableCell>
            <TableCell align="right">ALARM COUNT</TableCell>
            <TableCell align="right">WARN COUNT</TableCell>
            <TableCell align="right">TEMP</TableCell>
            <TableCell align="right">HUMIDITY</TableCell>
            <TableCell align="right">ACCEL X</TableCell>
            <TableCell align="right">ACCEL Y</TableCell>
            <TableCell align="right">ACCEL Z</TableCell>
            <TableCell align="right">ACCEL ALL</TableCell>
            <TableCell align="right">LAST UPDATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.mac_addr}</TableCell>
              <TableCell align="right">{row.publish_to}</TableCell>
              <TableCell align="right">{row.alarm_count}</TableCell>
              <TableCell align="right">{row.warn_count}</TableCell>
              <TableCell align="right">{row.temp}</TableCell>
              <TableCell align="right">{row.hum}</TableCell>
              <TableCell align="right">{row.accel_x}</TableCell>
              <TableCell align="right">{row.accel_y}</TableCell>
              <TableCell align="right">{row.accel_z}</TableCell>
              <TableCell align="right">{row.accel_all}</TableCell>
              <TableCell align="right">{row.last_update}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
