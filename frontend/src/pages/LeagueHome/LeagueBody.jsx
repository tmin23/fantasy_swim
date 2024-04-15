import React from "react";
import './LeagueBody.css';
import { Link } from "react-router-dom";
import { Typography, Button, Menu, MenuItem } from "@mui/material";


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
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem onClick={handleClose}>Tony</MenuItem>
        <MenuItem onClick={handleClose}>Mike</MenuItem>
        <MenuItem component={Link} to="/UserHome" onClick={handleClose}>
          Back to Leagues
        </MenuItem>
      </Menu>

      <section className="ranking">
        <div className="ranking-list">
          <h1>Your Team</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Swimmers</th>
                <th>Team</th>
                <th>Style</th>
                <th>Points</th>
                <th>Profile</th>
              
              </tr>

            </thead>

              <tbody>
                  <tr>
                    <td>01</td>
                    <td>🧑Mike Dowd</td>
                    <td>Rensselaer Polytechnic Institute Team</td>
                    <th>Freestyle</th>
                    <td>8</td>
                    <td><button onClick={() => window.location.href='https://www.swimcloud.com/swimmer/619459/'}>View Profile</button></td>
                  </tr>


                  <tr class="active">
                    <td>02</td>
                    <td>🧑Tony Min</td>
                    <td>Rensselaer Polytechnic Institute Team</td>
                    <th>Freestyle</th>
                    <td>7</td>
                    <td><button onClick={() => window.location.href='https://www.swimcloud.com/swimmer/409873/'}>View Profile</button></td>
                  </tr>


                  <tr>
                    <td>03</td>
                    <td>🧑Dan Chen</td>
                    <td>Rensselaer Polytechnic Institute Team</td>
                    <th>Freestyle</th>
                    <td>7</td>
                    <td><button onClick={() => window.location.href='https://www.swimcloud.com/swimmer/1180940/'}>View Profile</button></td>
                  </tr>

                
                <tr class="active">
                  <td>04</td>
                  <td>🧑Anthony Acciani</td>
                  <td>Rensselaer Polytechnic Institute Team</td>
                  <th>Freestyle</th>
                  <td>7</td>
                  <td><button onClick={() => window.location.href='https://www.swimcloud.com/swimmer/549223/'}>View Profile</button></td>
                  </tr>



                <tr>
                  <td>05</td>
                  <td>🧑Jake Fassora</td>
                  <td>Rensselaer Polytechnic Institute Team</td>
                  <th>Freestyle</th>
                  <td>5</td>
                  <td><button onClick={() => window.location.href='https://www.swimcloud.com/swimmer/2310254/'}>View Profile</button></td>
                  </tr>



                <tr class="active">
                <td>06</td>
                <td>🧑Ethan Gadbois</td>
                <td>Rensselaer Polytechnic Institute Team</td>
                <th>Freestyle</th>
                <td>4</td>
                <td><button onClick={() => window.location.href='https://www.swimcloud.com/swimmer/619020/'}>View Profile</button></td>
                  </tr>



                <tr>
                <td>07</td>
                <td>🧑Jimmy Zhen</td>
                <td>Rensselaer Polytechnic Institute Team</td>
                <th>Freestyle</th>
                <td>4</td>
                <td><button onClick={() => window.location.href='https://www.swimcloud.com/swimmer/1321677/'}>View Profile</button></td>
                  </tr>



                <tr class="active">
                <td>08</td>
                <td>🧑William Tan</td>
                <td>Rensselaer Polytechnic Institute Team</td>
                <th>Freestyle</th>
                <td>2</td>
                <td><button onClick={() => window.location.href='https://www.swimcloud.com/swimmer/671785/'}>View Profile</button></td>
                  </tr>



                <tr>
                <td>09</td>
                <td>🧑Andrew Palmer</td>
                <td>Rensselaer Polytechnic Institute Team</td>
                <th>Freestyle</th>
                <td>2</td>
                <td><button onclick="window.location.href='https://www.swimcloud.com/swimmer/478353/'">View Profile</button></td>
                </tr>

                <tr class="active">
                <td>10</td>
                <td>🧑Dan Savidge</td>
                <td>Rensselaer Polytechnic Institute Team</td>
                <th>Freestyle</th>
                <td>2</td>
                <td><button onClick={() => window.location.href='https://www.swimcloud.com/swimmer/818663/'}>View Profile</button></td>
                  </tr>


            </tbody>
          </table>




        </div>
      </section>
    </div>
  );
}
