import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Body() {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h2" gutterBottom>
        {/* Should be the league name */}
        Liberty League
      </Typography>
      <TableHead>
        <TableRow>
            {/* Can keep on adding cells if we want more infomation */}
          <StyledTableCell> Swimmers</StyledTableCell>
          <StyledTableCell> Team</StyledTableCell>
          <StyledTableCell> Points</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* Should pull from the database in order to complete the the drafted roster */}
        <StyledTableCell> Mike Dowd</StyledTableCell>
        <StyledTableCell> Rensselaer Polytechnic Insitute</StyledTableCell>
        <StyledTableCell> 2</StyledTableCell>
      </TableBody>
      <TableBody>
        <StyledTableCell> Tony Min</StyledTableCell>
        <StyledTableCell> Rensselaer Polytechnic Insitute Club Team</StyledTableCell>
        <StyledTableCell> More than Mike dowd</StyledTableCell>
      </TableBody>
    </TableContainer>
  );
}
