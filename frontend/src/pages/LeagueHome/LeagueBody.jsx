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
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import {Menu, MenuItem, Button} from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom'

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Body() {
  const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <TableContainer component={Paper}>
      <Button id = 'basic-button'
        aria-controls = {open ? 'basic-menu' : undefined}
        aria-haspopup = 'true'
        aria-expanded = {open ? 'true': undefined}
        onClick={handleClick}
      >
        {/* This should be your first leage that you have joined for "Main League" */}
        <Typography variant="h5" color = 'common.black'>
        {/* Should pull from database to the league name */}
        Your Team
        </Typography>
      </Button>
      <Menu id = 'basic-menu'
        anchorEl={anchorEl}
        open = {open}
        onClose={handleClose}
        MenuListProps={{'aria-labelledby': 'basic-button'}}
      >
        {/* Pull from database to get all users within the League */}
        <MenuItem onClick={handleClose}>Tony</MenuItem> 
        <MenuItem onClick={handleClose}>Mike</MenuItem>
        <Link to="/UserHome"><MenuItem onClick={handleClose}>Back to Leagues</MenuItem></Link>
        
      </Menu>
      
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
