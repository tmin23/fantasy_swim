import React from 'react';
import { MDBContainer,
MDBBtn,
MDBNavbar,
MDBNavbarBrand } from "mdb-react-ui-kit";
import swimcloudlogo from "../pages/Assets/swimcloud.png"

export default function App() {
    return (
      <MDBNavbar light bgColor='light'>
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
        </MDBContainer>
      </MDBNavbar>
    );
}