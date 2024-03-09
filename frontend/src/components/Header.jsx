import React from 'react';
import { MDBContainer,
MDBBtn,
MDBNavbar,
MDBNavbarBrand } from "mdb-react-ui-kit";
import swimcloudlogo from "../pages/Assets/swimcloud.png"

export default function App() {
    return (
        <>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            <img
              src={swimcloudlogo}
              height='40'
              alt='logo'
              loading='lazy'
            />
            Fantasy Swimming
          </MDBNavbarBrand>
          <div style= {{position: 'fixed', right: "30px"}}>
            <MDBBtn rounded>Create League</MDBBtn>
          </div>
        </MDBContainer>
      </MDBNavbar>
    </>
    );
}