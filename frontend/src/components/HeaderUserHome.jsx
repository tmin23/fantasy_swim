import React from 'react';
import { MDBContainer,
MDBBtn,
MDBNavbar,
MDBNavbarBrand } from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';
import swimcloudlogo from "../pages/Assets/swimcloud.png"

export default function App() {
    return (
      <MDBNavbar expand='lg' light style={{ backgroundColor: '#1E88E5' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            <img
              src={swimcloudlogo}
              height='40'
              alt='logo'
              loading='lazy'
            />
            <span class ="fw-bold">Fantasy Swimming</span>
          </MDBNavbarBrand>
          <div style= {{position: 'fixed', right: "30px"}}>
            <Link to="/CreateLeague">
              <MDBBtn rounded>Create League</MDBBtn>
            </Link>
          </div>
        </MDBContainer>
      </MDBNavbar>
    );
}